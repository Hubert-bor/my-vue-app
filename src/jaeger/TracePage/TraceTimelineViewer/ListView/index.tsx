
import { defineComponent, onMounted } from 'vue';
import Positions from './Positions';

type TWrapperProps = {
  style: any;
  ref: (elm: HTMLDivElement) => void;
  onScroll?: () => void;
};

/**
 * @typedef
 */
type TListViewProps = {
  /**
   * Number of elements in the list.
   */
  dataLength: number;
  /**
   * Convert item index (number) to the key (string). ListView uses both indexes
   * and keys to handle the addtion of new rows.
   */
  getIndexFromKey: (key: string) => number;
  /**
   * Convert item key (string) to the index (number). ListView uses both indexes
   * and keys to handle the addtion of new rows.
   */
  getKeyFromIndex: (index: number) => string;
  /**
   * Number of items to draw and add to the DOM, initially.
   */
  initialDraw?: number;
  /**
   * The parent provides fallback height measurements when there is not a
   * rendered element to measure.
   */
  itemHeightGetter: (index: number, key: string) => number;
  /**
   * Function that renders an item; rendered items are added directly to the
   * DOM, they are not wrapped in list item wrapper HTMLElement.
   */
  // itemRenderer(itemKey, style, i, attrs)
  itemRenderer: (
    itemKey: string,
    style: Record<string, string | number>,
    index: number,
    attributes: Record<string, string>
  ) => any;
  /**
   * `className` for the HTMLElement that holds the items.
   */
  itemsWrapperClassName?: string;
  /**
   * When adding new items to the DOM, this is the number of items to add above
   * and below the current view. E.g. if list is 100 items and is srcolled
   * halfway down (so items [46, 55] are in view), then when a new range of
   * items is rendered, it will render items `46 - viewBuffer` to
   * `55 + viewBuffer`.
   */
  viewBuffer: number;
  /**
   * The minimum number of items offscreen in either direction; e.g. at least
   * `viewBuffer` number of items must be off screen above and below the
   * current view, or more items will be rendered.
   */
  viewBufferMin: number;
  /**
   * When `true`, expect `_wrapperElm` to have `overflow: visible` and to,
   * essentially, be tall to the point the entire page will will end up
   * scrolling as a result of the ListView. Similar to react-virtualized
   * window scroller.
   *
   * - Ref: https://bvaughn.github.io/react-virtualized/#/components/WindowScroller
   * - Ref:https://github.com/bvaughn/react-virtualized/blob/497e2a1942529560681d65a9ef9f5e9c9c9a49ba/docs/WindowScroller.md
   */
  windowScroller?: boolean;
};

const DEFAULT_INITIAL_DRAW = 300;

/**
 * Virtualized list view component, for the most part, only renders the window
 * of items that are in-view with some buffer before and after. Listens for
 * scroll events and updates which items are rendered. See react-virtualized
 * for a suite of components with similar, but generalized, functinality.
 * https://github.com/bvaughn/react-virtualized
 *
 * Note: Presently, ListView cannot be a PureComponent. This is because ListView
 * is sensitive to the underlying state that drives the list items, but it
 * doesn't actually receive that state. So, a render may still be required even
 * if ListView's props are unchanged.
 *
 * @export
 * @class ListView
 */

export default defineComponent({
  name: 'ListView',
  props: {
    dataLength: Number,
    initialDraw: Number,
    viewBuffer: Number,
    viewBufferMin: Number,
    style: String,
    itemsWrapperClassName: String,
    onScroll: Function,
    getIndexFromKey: Function,
    itemHeightGetter: Function,
    getKeyFromIndex: Function,
    itemRenderer: Function,
    windowScroller: Boolean,
  },
  setup(props: any) {

    /**
   * Keeps track of the height and y-value of items, by item index, in the
   * ListView.
   */
    let _yPositions: Positions;
    /**
     * Keep track of the known / measured heights of the rendered items; populated
     * with values through observation and keyed on the item key, not the item
     * index.
     */
    let _knownHeights: Map<string, number>;
    /**
     * The start index of the items currently drawn.
     */
    let _startIndexDrawn: number;
    /**
     * The end index of the items currently drawn.
     */
    let _endIndexDrawn: number;
    /**
     * The start index of the items currently in view.
     */
    let _startIndex: number;
    /**
     * The end index of the items currently in view.
     */
    let _endIndex: number;
    /**
     * Height of the visual window, e.g. height of the scroller element.
     */
    let _viewHeight: number;
    /**
     * `scrollTop` of the current scroll position.
     */
    let _scrollTop: number;
    /**
     * Used to keep track of whether or not a re-calculation of what should be
     * drawn / viewable has been scheduled.
     */
    let _isScrolledOrResized: boolean;
    /**
     * If `windowScroller` is true, this notes how far down the page the scroller
     * is located. (Note: repositioning and below-the-fold views are untested)
     */
    let _htmlTopOffset: number;
    let _windowScrollListenerAdded: boolean;
    let _htmlElm: HTMLElement;
    /**
     * HTMLElement holding the scroller.
     */
    let _wrapperElm: HTMLElement;
    /**
     * HTMLElement holding the rendered items.
     */
    let _itemHolderElm: HTMLElement;

    let defaultProps = {
      initialDraw: DEFAULT_INITIAL_DRAW,
      itemsWrapperClassName: '',
      windowScroller: false,
    };

    _yPositions = new Positions(200);
    // _knownHeights is (item-key -> observed height) of list items
    _knownHeights = new Map();

    _startIndexDrawn = 2 ** 20;
    _endIndexDrawn = -(2 ** 20);
    _startIndex = 0;
    _endIndex = 0;
    _viewHeight = -1;
    _scrollTop = -1;
    _isScrolledOrResized = false;

    _htmlTopOffset = -1;
    _windowScrollListenerAdded = false;
    // _htmlElm is only relevant if props.windowScroller is true
    _htmlElm = document.documentElement as any;
    _wrapperElm = undefined;
    _itemHolderElm = undefined;

    onMounted(() => {
      if (props.windowScroller) {
        if (_wrapperElm) {
          const { top } = _wrapperElm.getBoundingClientRect();
          _htmlTopOffset = top + _htmlElm.scrollTop;
        }
        window.addEventListener('scroll', _onScroll);
        _windowScrollListenerAdded = true;
      }
    })

    // componentDidUpdate() {
    //   if (_itemHolderElm) {
    //   _scanItemHeights();
    //   }
    // }

    // componentWillUnmount() {
    //   if (_windowScrollListenerAdded) {
    //     window.removeEventListener('scroll', _onScroll);
    //   }
    // }

    const getViewHeight = () => _viewHeight;

    /**
     * Get the index of the item at the bottom of the current view.
     */
    const getBottomVisibleIndex = (): number => {
      const bottomY = _scrollTop + _viewHeight;
      return _yPositions.findFloorIndex(bottomY, _getHeight);
    };

    /**
     * Get the index of the item at the top of the current view.
     */
    const getTopVisibleIndex = (): number => _yPositions.findFloorIndex(_scrollTop, _getHeight);

    const getRowPosition = (index: number): { height: number; y: number } =>
      _yPositions.getRowPosition(index, _getHeight);

    /**
     * Scroll event listener that schedules a remeasuring of which items should be
     * rendered.
     */
    const _onScroll = () => {
      if (!_isScrolledOrResized) {
        _isScrolledOrResized = true;
        window.requestAnimationFrame(_positionList);
      }
    };

    /**
     * Returns true is the view height (scroll window) or scroll position have
     * changed.
     */
    const _isViewChanged = () => {
      if (!_wrapperElm) {
        return false;
      }
      const useRoot = props.windowScroller;
      const clientHeight = useRoot ? _htmlElm.clientHeight : _wrapperElm.clientHeight;
      const scrollTop = useRoot ? _htmlElm.scrollTop : _wrapperElm.scrollTop;
      return clientHeight !== _viewHeight || scrollTop !== _scrollTop;
    }

    /**
     * Recalculate _startIndex and _endIndex, e.g. which items are in view.
     */
    const _calcViewIndexes = () => {
      const useRoot = props.windowScroller;
      // funky if statement is to satisfy flow
      if (!useRoot) {
        /* istanbul ignore next */
        if (!_wrapperElm) {
          _viewHeight = -1;
          _startIndex = 0;
          _endIndex = 0;
          return;
        }
        _viewHeight = _wrapperElm.clientHeight;
        _scrollTop = _wrapperElm.scrollTop;
      } else {
        _viewHeight = window.innerHeight - _htmlTopOffset;
        _scrollTop = window.scrollY;
      }
      const yStart = _scrollTop;
      const yEnd = _scrollTop + _viewHeight;
      _startIndex = _yPositions.findFloorIndex(yStart, _getHeight);
      _endIndex = _yPositions.findFloorIndex(yEnd, _getHeight);
    }

    /**
     * Checked to see if the currently rendered items are sufficient, if not,
     * force an update to trigger more items to be rendered.
     */
    const _positionList = () => {
      _isScrolledOrResized = false;
      if (!_wrapperElm) {
        return;
      }
      _calcViewIndexes();
      // indexes drawn should be padded by at least props.viewBufferMin
      const maxStart =
        props.viewBufferMin > _startIndex ? 0 : _startIndex - props.viewBufferMin;
      const minEnd =
        props.viewBufferMin < props.dataLength - _endIndex
          ? _endIndex + props.viewBufferMin
          : props.dataLength - 1;
      if (maxStart < _startIndexDrawn || minEnd > _endIndexDrawn) {
        // forceUpdate();
      }
    };

    const _initWrapper = (elm: HTMLElement) => {
      _wrapperElm = elm;
      if (!props.windowScroller && elm) {
        _viewHeight = elm.clientHeight;
      }
    };

    const _initItemHolder = (elm: HTMLElement) => {
      _itemHolderElm = elm;
      _scanItemHeights();
    };

    /**
     * Go through all items that are rendered and save their height based on their
     * item-key (which is on a data-* attribute). If any new or adjusted heights
     * are found, re-measure the current known y-positions (via .yPositions).
     */
    const _scanItemHeights = () => {
      const getIndexFromKey = props.getIndexFromKey;
      if (!_itemHolderElm) {
        return;
      }
      // note the keys for the first and last altered heights, the `yPositions`
      // needs to be updated
      let lowDirtyKey = null;
      let highDirtyKey = null;
      let isDirty = false;
      // iterating childNodes is faster than children
      // https://jsperf.com/large-htmlcollection-vs-large-nodelist
      const nodes = _itemHolderElm.childNodes;
      const max = nodes.length;
      for (let i = 0; i < max; i++) {
        const node: HTMLElement = nodes[i] as any;
        // use `.getAttribute(...)` instead of `.dataset` for jest / JSDOM
        const itemKey = node?.getAttribute?.('data-item-key');
        if (!itemKey) {
          // eslint-disable-next-line no-console
          console.warn('itemKey not found');
          continue;
        }
        // measure the first child, if it's available, otherwise the node itself
        // (likely not transferable to other contexts, and instead is specific to
        // how we have the items rendered)
        const measureSrc: Element = node.firstElementChild || node;
        const observed = measureSrc.clientHeight;
        const known = _knownHeights.get(itemKey);
        if (observed !== known) {
          _knownHeights.set(itemKey, observed);
          if (!isDirty) {
            isDirty = true;
            // eslint-disable-next-line no-multi-assign
            lowDirtyKey = highDirtyKey = itemKey;
          } else {
            highDirtyKey = itemKey;
          }
        }
      }
      if (lowDirtyKey != null && highDirtyKey != null) {
        // update yPositions, then redraw
        const imin = getIndexFromKey(lowDirtyKey);
        const imax = highDirtyKey === lowDirtyKey ? imin : getIndexFromKey(highDirtyKey);
        _yPositions.calcHeights(imax, _getHeight, imin);
        // forceUpdate();
      }
    };

    /**
     * Get the height of the element at index `i`; first check the known heigths,
     * fallbck to `.props.itemHeightGetter(...)`.
     */
    const _getHeight = (i: number) => {
      const key = props?.getKeyFromIndex?.(i);
      const known = _knownHeights.get(key);
      // known !== known iff known is NaN
      // eslint-disable-next-line no-self-compare
      if (known != null && known === known) {
        return known;
      }
      return props?.itemHeightGetter?.(i, key);
    };

    const {
      dataLength,
      getKeyFromIndex,
      initialDraw = DEFAULT_INITIAL_DRAW,
      itemRenderer,
      viewBuffer,
      viewBufferMin,
    } = props;
    const heightGetter = _getHeight;
    const items = [];
    let start;
    let end;

    _yPositions.profileData(dataLength);

    if (!_wrapperElm) {
      start = 0;
      end = (initialDraw < dataLength ? initialDraw : dataLength) - 1;
    } else {
      if (_isViewChanged()) {
        _calcViewIndexes();
      }
      const maxStart = viewBufferMin > _startIndex ? 0 : _startIndex - viewBufferMin;
      const minEnd =
        viewBufferMin < dataLength - _endIndex ? _endIndex + viewBufferMin : dataLength - 1;
      if (maxStart < _startIndexDrawn || minEnd > _endIndexDrawn) {
        start = viewBuffer > _startIndex ? 0 : _startIndex - viewBuffer;
        end = _endIndex + viewBuffer;
        if (end >= dataLength) {
          end = dataLength - 1;
        }
      } else {
        start = _startIndexDrawn;
        end = _endIndexDrawn > dataLength - 1 ? dataLength - 1 : _endIndexDrawn;
      }
    }

    _yPositions.calcHeights(end, heightGetter, start || -1);
    _startIndexDrawn = start;
    _endIndexDrawn = end;

    items.length = end - start + 1;
    for (let i = start; i <= end; i++) {
      const { y: top, height } = _yPositions.getRowPosition(i, heightGetter);
      const style = {
        height,
        top,
        position: 'absolute',
      };
      const itemKey = getKeyFromIndex(i);
      const attrs = { 'data-item-key': itemKey };

      items.push(itemRenderer(itemKey, style, i, attrs));
    }
    const wrapperProps: TWrapperProps = {
      style: { position: 'relative' },
      ref: _initWrapper,
    };
    if (!props.windowScroller) {
      wrapperProps.onScroll = _onScroll;
      wrapperProps.style.height = '100%';
      wrapperProps.style.overflowY = 'auto';
    }
    const scrollerStyle = {
      position: 'relative' as const,
      height: _yPositions.getEstimatedHeight(),
    };
    const vnodes = items.filter(item => item)
    return () => (
      <>
        <div {...wrapperProps}>
          <div style={scrollerStyle}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                margin: 0,
                padding: 0,
              }}
              class={props.itemsWrapperClassName}
              ref={_initItemHolder}
            >
              {/* {...vnodes.map((item) => createVNode(item))} */}
              {vnodes}
            </div>
          </div>
        </div>
      </>
    )
  }
})


import { createVNode } from 'vue'
