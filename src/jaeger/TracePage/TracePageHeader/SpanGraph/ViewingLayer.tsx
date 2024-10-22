import { Button } from 'ant-design-vue';

import GraphTicks from './GraphTicks';
import Scrubber from './Scrubber';
import { TUpdateViewRangeTimeFunction, IViewRange, ViewRangeTimeUpdate } from '../../types';
import DraggableManager, {
  DraggableBounds,
  DraggingUpdate,
  EUpdateTypes,
} from '../../../utils/DraggableManager';

import './ViewingLayer.css';
import { defineComponent } from 'vue';

type ViewingLayerProps = {
  height: number;
  numTicks: number;
  updateViewRangeTime: TUpdateViewRangeTimeFunction;
  updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
  viewRange: IViewRange;
};

type ViewingLayerState = {
  /**
   * Cursor line should not be drawn when the mouse is over the scrubber handle.
   */
  preventCursorLine: boolean;
};

/**
 * Designate the tags for the different dragging managers. Exported for tests.
 */
export const dragTypes = {
  /**
   * Tag for dragging the right scrubber, e.g. end of the current view range.
   */
  SHIFT_END: 'SHIFT_END',
  /**
   * Tag for dragging the left scrubber, e.g. start of the current view range.
   */
  SHIFT_START: 'SHIFT_START',
  /**
   * Tag for dragging a new view range.
   */
  REFRAME: 'REFRAME',
};

/**
 * Returns the layout information for drawing the view-range differential, e.g.
 * show what will change when the mouse is released. Basically, this is the
 * difference from the start of the drag to the current position.
 *
 * @returns {{ x: string, width: string, leadginX: string }}
 */
function getNextViewLayout(start: number, position: number) {
  const [left, right] = start < position ? [start, position] : [position, start];
  return {
    x: `${left * 100}%`,
    width: `${(right - left) * 100}%`,
    leadingX: `${position * 100}%`,
  };
}

/**
 * `ViewingLayer` is rendered on top of the Canvas rendering of the minimap and
 * handles showing the current view range and handles mouse UX for modifying it.
 */


export default defineComponent({
  name: 'ViewingLayer',
  components: { GraphTicks, Scrubber },
  props: {
    viewRange: { type: Object },
    height: { type: Number },
    numTicks: { type: Number },
    updateNextViewRangeTime: { type: Function },
    updateViewRangeTime: { type: Function }
  },
  setup(props: any) {
    let state: ViewingLayerState;

    let _root: Element;

    /**
     * `_draggerReframe` handles clicking and dragging on the `ViewingLayer` to
     * redefined the view range.
     */
    let _draggerReframe: DraggableManager;

    /**
     * `_draggerStart` handles dragging the left scrubber to adjust the start of
     * the view range.
     */
    let _draggerStart: DraggableManager;

    const _getDraggingBounds = (tag: string | undefined | null): DraggableBounds => {
      if (!_root) {
        throw new Error('invalid state');
      }
      console.log('%c ~ _root ~ ', 'color:#2ecc71', _root)
      const { left: clientXLeft, width } = _root.getBoundingClientRect();
      const [viewStart, viewEnd] = props.viewRange.time.current;
      let maxValue = 1;
      let minValue = 0;
      if (tag === dragTypes.SHIFT_START) {
        maxValue = viewEnd;
      } else if (tag === dragTypes.SHIFT_END) {
        minValue = viewStart;
      }
      return { clientXLeft, maxValue, minValue, width };
    };


    const _handleReframeDragEnd = ({ manager, value }: DraggingUpdate) => {
      const { time } = props.viewRange;
      const anchor = time.reframe ? time.reframe.anchor : value;
      const [start, end] = value < anchor ? [value, anchor] : [anchor, value];
      manager.resetBounds();
      props.updateViewRangeTime(start, end, 'minimap');
    };


    const _handleReframeDragUpdate = ({ value }: DraggingUpdate) => {
      const shift = value;
      const { time } = props.viewRange;
      const anchor = time.reframe ? time.reframe.anchor : shift;
      const update = { reframe: { anchor, shift } };
      props.updateNextViewRangeTime(update);
    };

    const _handleReframeMouseMove = ({ value }: DraggingUpdate) => {
      console.log('%c ~ value ~ ', 'color:#2ecc71', value)
      props.updateNextViewRangeTime({ cursor: value });
    };

    const _handleReframeMouseLeave = () => {
      props.updateNextViewRangeTime({ cursor: null });
    };

    const _handleScrubberDragEnd = ({ manager, tag, value }: DraggingUpdate) => {
      const [viewStart, viewEnd] = props.viewRange.time.current;
      let update: [number, number];
      if (tag === dragTypes.SHIFT_START) {
        update = [value, viewEnd];
      } else if (tag === dragTypes.SHIFT_END) {
        update = [viewStart, value];
      } else {
        // to satisfy flow
        throw new Error('bad state');
      }
      manager.resetBounds();
      // setState({ preventCursorLine: false });
      props.updateViewRangeTime(update[0], update[1], 'minimap');
    };


    const _handleScrubberDragUpdate = ({ event, tag, type, value }: DraggingUpdate) => {
      if (type === EUpdateTypes.DragStart) {
        event.stopPropagation();
      }
      if (tag === dragTypes.SHIFT_START) {
        props.updateNextViewRangeTime({ shiftStart: value });
      } else if (tag === dragTypes.SHIFT_END) {
        props.updateNextViewRangeTime({ shiftEnd: value });
      }
    };

    const _handleScrubberEnterLeave = ({ type }: DraggingUpdate) => {
      const preventCursorLine = type === EUpdateTypes.MouseEnter;
      // setState({ preventCursorLine });
    };


    /**
     * `_draggerEnd` handles dragging the right scrubber to adjust the end of
     * the view range.
     */
    let _draggerEnd: DraggableManager;
    _draggerReframe = new DraggableManager({
      getBounds: _getDraggingBounds,
      onDragEnd: _handleReframeDragEnd,
      onDragMove: _handleReframeDragUpdate,
      onDragStart: _handleReframeDragUpdate,
      onMouseMove: _handleReframeMouseMove,
      onMouseLeave: _handleReframeMouseLeave,
      tag: dragTypes.REFRAME,
    });


    _draggerStart = new DraggableManager({
      getBounds: _getDraggingBounds,
      onDragEnd: _handleScrubberDragEnd,
      onDragMove: _handleScrubberDragUpdate,
      onDragStart: _handleScrubberDragUpdate,
      onMouseEnter: _handleScrubberEnterLeave,
      onMouseLeave: _handleScrubberEnterLeave,
      tag: dragTypes.SHIFT_START,
    });

    _draggerEnd = new DraggableManager({
      getBounds: _getDraggingBounds,
      onDragEnd: _handleScrubberDragEnd,
      onDragMove: _handleScrubberDragUpdate,
      onDragStart: _handleScrubberDragUpdate,
      onMouseEnter: _handleScrubberEnterLeave,
      onMouseLeave: _handleScrubberEnterLeave,
      tag: dragTypes.SHIFT_END,
    });

    state = {
      preventCursorLine: false,
    };

    const componentWillUnmount = () => {
      _draggerReframe.dispose();
      _draggerEnd.dispose();
      _draggerStart.dispose();
    }

    const _setRoot = (elm: SVGElement | undefined | null) => {
      _root = elm;
    };

    /**
     * Resets the zoom to fully zoomed out.
     */
    const _resetTimeZoomClickHandler = () => {
      props.updateViewRangeTime(0, 1);
    };

    /**
     * Renders the difference between where the drag started and the current
     * position, e.g. the red or blue highlight.
     *
     * @returns React.Node[]
     */
    const _getMarkers = (from: number, to: number, isShift: boolean) => {
      const layout = getNextViewLayout(from, to);
      const cls = {
        isShiftDrag: isShift,
        isReframeDrag: !isShift,
      }
      return [
        <rect
          key="fill"
          class={`ViewingLayer--draggedShift ${cls}`}
          x={layout.x}
          y="0"
          width={layout.width}
          height={props.height - 2}
        />,
        <rect
          key="edge"
          class={`ViewingLayer--draggedEdge ${cls}`}
          x={layout.leadingX}
          y="0"
          width="1"
          height={props.height - 2}
        />,
      ];
    }

    const { height, viewRange, numTicks } = props;
    const { preventCursorLine } = state;
    const { current, cursor, shiftStart, shiftEnd, reframe } = viewRange.time;
    const haveNextTimeRange = shiftStart != null || shiftEnd != null || reframe != null;
    const [viewStart, viewEnd] = current;
    let leftInactive = 0;
    if (viewStart) {
      leftInactive = viewStart * 100;
    }
    let rightInactive = 100;
    if (viewEnd) {
      rightInactive = 100 - viewEnd * 100;
    }
    let cursorPosition: string | undefined;
    if (!haveNextTimeRange && cursor != null && !preventCursorLine) {
      cursorPosition = `${cursor * 100}%`;
    }


    return () => (
      <>
        <div aria-hidden class="ViewingLayer" style={{ height }} >
          {(viewStart !== 0 || viewEnd !== 1) && (
            <Button
              onClick={_resetTimeZoomClickHandler}
              class="ViewingLayer--resetZoom"
              htmlType="button"
            >
              Reset Selection
            </Button>
          )}
          <svg
            height={height}
            class="ViewingLayer--graph"
            ref={_setRoot}
            onMouseDown={_draggerReframe.handleMouseDown}
            onMouseLeave={_draggerReframe.handleMouseLeave}
            onMouseMove={_draggerReframe.handleMouseMove}
          >
            {leftInactive > 0 && (
              <rect x={0} y={0} height="100%" width={`${leftInactive}%`} class="ViewingLayer--inactive" />
            )}
            {rightInactive > 0 && (
              <rect
                x={`${100 - rightInactive}%`}
                y={0}
                height="100%"
                width={`${rightInactive}%`}
                class="ViewingLayer--inactive"
              />
            )}
            <GraphTicks numTicks={numTicks} />
            {cursorPosition && (
              <line
                class="ViewingLayer--cursorGuide"
                x1={cursorPosition}
                y1="0"
                x2={cursorPosition}
                y2={height - 2}
                strokeWidth="1"
              />
            )}
            {shiftStart != null && _getMarkers(viewStart, shiftStart, true)}
            {shiftEnd != null && _getMarkers(viewEnd, shiftEnd, true)}
            <Scrubber
              isDragging={shiftStart != null}
              onMouseDown={_draggerStart.handleMouseDown}
              onMouseEnter={_draggerStart.handleMouseEnter}
              onMouseLeave={_draggerStart.handleMouseLeave}
              position={viewStart || 0}
            />
            <Scrubber
              isDragging={shiftEnd != null}
              position={viewEnd || 1}
              onMouseDown={_draggerEnd.handleMouseDown}
              onMouseEnter={_draggerEnd.handleMouseEnter}
              onMouseLeave={_draggerEnd.handleMouseLeave}
            />
            {reframe != null && _getMarkers(reframe.anchor, reframe.shift, false)}
          </svg>
          {/* fullOverlay updates the mouse cursor blocks mouse events */}
          {haveNextTimeRange && <div class="ViewingLayer--fullOverlay" />}
        </div>
      </>
    )
  }
})

