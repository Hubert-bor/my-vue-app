
import { defineComponent, onMounted, ref } from 'vue';
import { TUpdateViewRangeTimeFunction, IViewRangeTime, ViewRangeTimeUpdate } from '../../types';
import './TimelineViewingLayer.css';
import DraggableManager from '../../../utils/DraggableManager';

type TimelineViewingLayerProps = {
  /**
   * `boundsInvalidator` is an arbitrary prop that lets the component know the
   * bounds for dragging need to be recalculated. In practice, the name column
   * width serves fine for 
   */
  boundsInvalidator: any | null | undefined;
  updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
  updateViewRangeTime: TUpdateViewRangeTimeFunction;
  viewRangeTime: IViewRangeTime;
};

type TDraggingLeftLayout = {
  isDraggingLeft: boolean;
  left: string;
  width: string;
};

type TOutOfViewLayout = {
  isOutOfView: true;
};

type TNil = null | undefined;

function isOutOfView(layout: TDraggingLeftLayout | TOutOfViewLayout): layout is TOutOfViewLayout {
  return Reflect.has(layout, 'isOutOfView');
}

/**
 * Map from a sub range to the greater view range, e.g, when the view range is
 * the middle half ([0.25, 0.75]), a value of 0.25 befomes 3/8.
 * @returns {number}
 */
function mapFromViewSubRange(viewStart: number, viewEnd: number, value: number) {
  return viewStart + value * (viewEnd - viewStart);
}

/**
 * Map a value from the view ([0, 1]) to a sub-range, e.g, when the view range is
 * the middle half ([0.25, 0.75]), a value of 3/8 becomes 1/4.
 * @returns {number}
 */
function mapToViewSubRange(viewStart: number, viewEnd: number, value: number) {
  return (value - viewStart) / (viewEnd - viewStart);
}

/**
 * Get the layout for the "next" view range time, e.g. the difference from the
 * drag start and the drag end. This is driven by `shiftStart`, `shiftEnd` or
 * `reframe` on `props.viewRangeTime`, not by the current state of the
 * component. So, it reflects in-progress dragging from the span minimap.
 */
function getNextViewLayout(start: number, position: number): TDraggingLeftLayout | TOutOfViewLayout {
  let [left, right] = start < position ? [start, position] : [position, start];
  if (left >= 1 || right <= 0) {
    return { isOutOfView: true };
  }
  if (left < 0) {
    left = 0;
  }
  if (right > 1) {
    right = 1;
  }
  return {
    isDraggingLeft: start > position,
    left: `${left * 100}%`,
    width: `${(right - left) * 100}%`,
  };
}

/**
 * Render the visual indication of the "next" view range.
 */
function getMarkers(
  viewStart: number,
  viewEnd: number,
  from: number,
  to: number,
  isShift: boolean
): any {
  const mappedFrom = mapToViewSubRange(viewStart, viewEnd, from);
  const mappedTo = mapToViewSubRange(viewStart, viewEnd, to);
  const layout = getNextViewLayout(mappedFrom, mappedTo);
  if (isOutOfView(layout)) {
    return null;
  }
  const { isDraggingLeft, left, width } = layout;
  const cls = {
    isDraggingLeft,
    isDraggingRight: !isDraggingLeft,
    isReframeDrag: !isShift,
    isShiftDrag: isShift,
  }
  return () => (
    <>
      <div className={`TimelineViewingLayer--dragged ${cls}`} style={{ left, width }} />;
    </>
  )
}

/**
 * `TimelineViewingLayer` is rendered on top of the TimelineHeaderRow time
 * labels; it handles showing the current view range and handles mouse UX for
 * modifying it.
 */
export default defineComponent({
  name: 'TimelineViewingLayer',
  props: { viewRangeTime: { type: Object } },
  setup(props: any, ctx) {
    let _draggerReframe: any;
    let _root: any = ref(null);



    const componentDidUpdate = (prevProps: Readonly<TimelineViewingLayerProps>) => {
      const { boundsInvalidator } = props;
      if (prevProps.boundsInvalidator !== boundsInvalidator) {
        _draggerReframe.resetBounds();
      }
    }

    onMounted(() => {
      _draggerReframe.dispose();

    })

    const _getDraggingBounds = (): any => {
      const current = _root.value;
      if (!current) {
        throw new Error('Component must be mounted in order to determine DraggableBounds');
      }
      const { left: clientXLeft, width } = current.getBoundingClientRect();
      return { clientXLeft, width };
    };

    const _handleReframeMouseMove = ({ value }: any) => {
      const [viewStart, viewEnd] = props.viewRangeTime.current;
      const cursor = mapFromViewSubRange(viewStart, viewEnd, value);
      props.updateNextViewRangeTime({ cursor });
    };

    const _handleReframeMouseLeave = () => {
      props.updateNextViewRangeTime({ cursor: undefined });
    };

    const _getAnchorAndShift = (value: number) => {
      const { current, reframe } = props.viewRangeTime;
      const [viewStart, viewEnd] = current;
      const shift = mapFromViewSubRange(viewStart, viewEnd, value);
      const anchor = reframe ? reframe.anchor : shift;
      return { anchor, shift };
    };

    const _handleReframeDragUpdate = ({ value }: any) => {
      const { anchor, shift } = _getAnchorAndShift(value);
      const update = { reframe: { anchor, shift } };
      props.updateNextViewRangeTime(update);
    };

    const _handleReframeDragEnd = ({ manager, value }: any) => {
      const { anchor, shift } = _getAnchorAndShift(value);
      const [start, end] = shift < anchor ? [shift, anchor] : [anchor, shift];
      manager.resetBounds();
      props.updateViewRangeTime(start, end, 'timeline-header');
    };

    _draggerReframe = new DraggableManager({
      getBounds: _getDraggingBounds,
      onDragEnd: _handleReframeDragEnd,
      onDragMove: _handleReframeDragUpdate,
      onDragStart: _handleReframeDragUpdate,
      onMouseLeave: _handleReframeMouseLeave,
      onMouseMove: _handleReframeMouseMove,
    });

    const { viewRangeTime } = props;
    const { current, cursor, reframe, shiftEnd, shiftStart } = viewRangeTime;
    const [viewStart, viewEnd] = current;
    const haveNextTimeRange = reframe != null || shiftEnd != null || shiftStart != null;
    let cusrorPosition: string | TNil;
    if (!haveNextTimeRange && cursor != null && cursor >= viewStart && cursor <= viewEnd) {
      cusrorPosition = `${mapToViewSubRange(viewStart, viewEnd, cursor) * 100}%`;
    }
    return () => (
      <>
        <div
          aria-hidden
          class="TimelineViewingLayer"
          ref={_root}
          onMousedown={_draggerReframe.handleMouseDown}
          onMouseleave={_draggerReframe.handleMouseLeave}
          onMousemove={_draggerReframe.handleMouseMove}
        >
          {cusrorPosition != null && (
            <div class="TimelineViewingLayer--cursorGuide" style={{ left: cusrorPosition }} />
          )}
          {reframe != null && getMarkers(viewStart, viewEnd, reframe.anchor, reframe.shift, false)}
          {shiftEnd != null && getMarkers(viewStart, viewEnd, viewEnd, shiftEnd, true)}
          {shiftStart != null && getMarkers(viewStart, viewEnd, viewStart, shiftStart, true)}
        </div>
      </>
    )
  },
})


