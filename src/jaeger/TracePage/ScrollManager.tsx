import { defineComponent } from "vue";

/**
 * `Accessors` is necessary because `ScrollManager` needs to be created by
 * `TracePage` so it can be passed into the keyboard shortcut manager. But,
 * `ScrollManager` needs to know about the state of `ListView` and `Positions`,
 * which are very low-level. And, storing their state info in redux or
 * `TracePage#state` would be inefficient because the state info only rarely
 * needs to be accessed (when a keyboard shortcut is triggered). `Accessors`
 * allows that state info to be accessed in a loosely coupled fashion on an
 * as-needed basis.
 */
export type Accessors = {
  getViewRange: () => [number, number];
  getSearchedSpanIDs: () => Set<string> | undefined | null;
  getCollapsedChildren: () => Set<string> | undefined | null;
  getViewHeight: () => number;
  getBottomRowIndexVisible: () => number;
  getTopRowIndexVisible: () => number;
  getRowPosition: (rowIndex: number) => { height: number; y: number };
  mapRowIndexToSpanIndex: (rowIndex: number) => number;
  mapSpanIndexToRowIndex: (spanIndex: number) => number;
};

interface IScroller {
  scrollTo: (rowIndex: number) => void;
  // TODO arg names throughout
  scrollBy: (rowIndex: number, opt?: boolean) => void;
}

/**
 * Returns `{ isHidden: true, ... }` if one of the parents of `span` is
 * collapsed, e.g. has children hidden.
 *
 * @param {Span} span The Span to check for.
 * @param {Set<string>} childrenAreHidden The set of Spans known to have hidden
 *                                        children, either because it is
 *                                        collapsed or has a collapsed parent.
 * @param {Map<string, Span> | TNil} spansMap Mapping from spanID to Span.
 * @returns {{ isHidden: boolean, parentIds: Set<string> }}
 */
function isSpanHidden(span: any, childrenAreHidden: Set<string>, spansMap: Map<string, any>) {
  const parentIDs = new Set<string>();
  let { references }: { references: any } = span;
  let parentID: undefined | string;
  const checkRef = (ref: any) => {
    if (ref.refType === 'CHILD_OF' || ref.refType === 'FOLLOWS_FROM') {
      parentID = ref.spanID;
      parentIDs.add(parentID);
      return childrenAreHidden.has(parentID);
    }
    return false;
  };
  while (Array.isArray(references) && references.length) {
    const isHidden = references.some(checkRef);
    if (isHidden) {
      return { isHidden, parentIDs };
    }
    if (!parentID) {
      break;
    }
    const parent = spansMap.get(parentID);
    parentID = undefined;
    references = parent && parent.references;
  }
  return { parentIDs, isHidden: false };
}

/**
 * ScrollManager is intended for scrolling the TracePage. Has two modes, paging
 * and scrolling to the previous or next visible span.
 */

export default defineComponent({
  name: 'ScrollManager',

  setup(props) {

    let _trace: any;
    let _scroller: IScroller;
    let _accessors: Accessors;

    // _trace = trace;
    // _scroller = scroller;
    // _accessors = undefined;

    const _scrollPast = (rowIndex: number, direction: 1 | -1) => {
      const xrs = _accessors;
      /* istanbul ignore next */
      if (!xrs) {
        throw new Error('Accessors not set');
      }
      const isUp = direction < 0;
      const position = xrs.getRowPosition(rowIndex);
      if (!position) {
        // eslint-disable-next-line no-console
        console.warn('Invalid row index');
        return;
      }
      let { y } = position;
      const vh = xrs.getViewHeight();
      if (!isUp) {
        y += position.height;
        // scrollTop is based on the top of the window
        y -= vh;
      }
      y += direction * 0.5 * vh;
      _scroller?.scrollTo(y);
    }

    const _scrollToVisibleSpan = (direction: 1 | -1, startRow?: number) => {
      const xrs = _accessors;
      /* istanbul ignore next */
      if (!xrs) {
        throw new Error('Accessors not set');
      }
      if (!_trace) {
        return;
      }
      const { duration, spans, startTime: traceStartTime } = _trace;
      const isUp = direction < 0;
      let boundaryRow: number;
      if (startRow != null) {
        boundaryRow = startRow;
      } else if (isUp) {
        boundaryRow = xrs.getTopRowIndexVisible();
      } else {
        boundaryRow = xrs.getBottomRowIndexVisible();
      }
      const spanIndex = xrs.mapRowIndexToSpanIndex(boundaryRow);
      if ((spanIndex === 0 && isUp) || (spanIndex === spans.length - 1 && !isUp)) {
        return;
      }
      // fullViewSpanIndex is one row inside the view window unless already at the top or bottom
      let fullViewSpanIndex = spanIndex;
      if (spanIndex !== 0 && spanIndex !== spans.length - 1) {
        fullViewSpanIndex -= direction;
      }
      const [viewStart, viewEnd] = xrs.getViewRange();
      const checkVisibility = viewStart !== 0 || viewEnd !== 1;
      // use NaN as fallback to make flow happy
      const startTime = checkVisibility ? traceStartTime + duration * viewStart : NaN;
      const endTime = checkVisibility ? traceStartTime + duration * viewEnd : NaN;
      const findMatches = xrs.getSearchedSpanIDs();
      const _collapsed = xrs.getCollapsedChildren();
      const childrenAreHidden = _collapsed ? new Set(_collapsed) : null;
      // use empty Map as fallback to make flow happy
      const spansMap: Map<string, any> = childrenAreHidden
        ? new Map(spans.map(s => [s.spanID, s] as [string, any]))
        : new Map();
      const boundary = direction < 0 ? -1 : spans.length;
      let nextSpanIndex: number | undefined;
      for (let i = fullViewSpanIndex + direction; i !== boundary; i += direction) {
        const span = spans[i];
        const { duration: spanDuration, spanID, startTime: spanStartTime } = span;
        const spanEndTime = spanStartTime + spanDuration;
        if (checkVisibility && (spanStartTime > endTime || spanEndTime < startTime)) {
          // span is not visible within the view range
          continue;
        }
        if (findMatches && !findMatches.has(spanID)) {
          // skip to search matches (when searching)
          continue;
        }
        if (childrenAreHidden) {
          // make sure the span is not collapsed
          const { isHidden, parentIDs } = isSpanHidden(span, childrenAreHidden, spansMap);
          if (isHidden) {
            parentIDs.forEach(id => childrenAreHidden.add(id));
            continue;
          }
        }
        nextSpanIndex = i;
        break;
      }
      if (!nextSpanIndex || nextSpanIndex === boundary) {
        // might as well scroll to the top or bottom
        nextSpanIndex = boundary - direction;

        // If there are hidden children, scroll to the last visible span
        if (childrenAreHidden) {
          let isFallbackHidden: boolean;
          do {
            const { isHidden, parentIDs } = isSpanHidden(spans[nextSpanIndex], childrenAreHidden, spansMap);
            if (isHidden) {
              parentIDs.forEach(id => childrenAreHidden.add(id));
              nextSpanIndex--;
            }
            isFallbackHidden = isHidden;
          } while (isFallbackHidden);
        }
      }
      const nextRow = xrs.mapSpanIndexToRowIndex(nextSpanIndex);
      _scrollPast(nextRow, direction);
    }

    /**
     * Sometimes the ScrollManager is created before the trace is loaded. This
     * setter allows the trace to be set asynchronously.
     */
    const setTrace = (trace: any) => {
      _trace = trace;
    }

    /**
     * `setAccessors` is bound in the ctor, so it can be passed as a prop to
     * children components.
     */
    const setAccessors = (accessors: Accessors) => {
      _accessors = accessors;
    };

    /**
     * Scrolls around one page down (0.95x). It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */
    const scrollPageDown = () => {
      if (!_scroller || !_accessors) {
        return;
      }
      _scroller.scrollBy(0.95 * _accessors.getViewHeight(), true);
    };

    /**
     * Scrolls around one page up (0.95x). It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */
    const scrollPageUp = () => {
      if (!_scroller || !_accessors) {
        return;
      }
      _scroller.scrollBy(-0.95 * _accessors.getViewHeight(), true);
    };

    /**
     * Scrolls to the next visible span, ignoring spans that do not match the
     * text filter, if there is one. It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */
    const scrollToNextVisibleSpan = () => {
      _scrollToVisibleSpan(1);
    };

    /**
     * Scrolls to the previous visible span, ignoring spans that do not match the
     * text filter, if there is one. It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */
    const scrollToPrevVisibleSpan = () => {
      _scrollToVisibleSpan(-1);
    };

    const scrollToFirstVisibleSpan = () => {
      _scrollToVisibleSpan(1, 0);
    };

    // destroy() {
    //   _trace = undefined;
    //   _scroller = undefined;
    //   _accessors = undefined;
    // }

  }
})
