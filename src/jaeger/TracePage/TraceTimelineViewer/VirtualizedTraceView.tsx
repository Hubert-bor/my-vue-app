import _isEqual from 'lodash/isEqual';

// import { History as RouterHistory, Location } from 'history';

import ListView from './ListView';
import SpanBarRow from './SpanBarRow';
import DetailState from './SpanDetail/DetailState';
import SpanDetailRow from './SpanDetailRow';
import {
  createViewedBoundsFunc,
  findServerChildSpan,
  isErrorSpan,
  isKindClient,
  isKindProducer,
  spanContainsErredSpan,
  ViewedBoundsFunctionType,
} from './utils';
import { Accessors } from '../ScrollManager';
import { extractUiFindFromState, TExtractUiFindFromStateReturn } from '../../common/UiFindInput';
import getLinks from '../../model/link-patterns';
import colorGenerator from '../../utils/colorGenerator';

import './VirtualizedTraceView.css';
import updateUiFind from '../../utils/update-ui-find';
import { defineComponent } from 'vue';

type RowState = {
  isDetail: boolean;
  span: any;
  spanIndex: number;
};

type TVirtualizedTraceViewOwnProps = {
  currentViewRangeTime: [number, number];
  findMatchesIDs: Set<string> | null | undefined;
  scrollToFirstVisibleSpan: () => void;
  registerAccessors: (accesors: Accessors) => void;
  trace: any;
  criticalPath: any[];
};

type TDispatchProps = {
  childrenToggle: (spanID: string) => void;
  clearShouldScrollToFirstUiFindMatch: () => void;
  detailLogItemToggle: (spanID: string, log: any) => void;
  detailLogsToggle: (spanID: string) => void;
  detailWarningsToggle: (spanID: string) => void;
  detailReferencesToggle: (spanID: string) => void;
  detailProcessToggle: (spanID: string) => void;
  detailTagsToggle: (spanID: string) => void;
  detailToggle: (spanID: string) => void;
  setSpanNameColumnWidth: (width: number) => void;
  setTrace: (trace: any | null | undefined, uiFind: string | null | undefined) => void;
  focusUiFindMatches: (trace: any, uiFind: string | null | undefined, allowHide?: boolean) => void;
};

type RouteProps = {
  location: Location;
  history: History;
};

type VirtualizedTraceViewProps = TVirtualizedTraceViewOwnProps &
  TDispatchProps &
  TExtractUiFindFromStateReturn &
  any &
  RouteProps;

// export for tests
export const DEFAULT_HEIGHTS = {
  bar: 28,
  detail: 161,
  detailWithLogs: 197,
};

const NUM_TICKS = 5;

function generateRowStates(
  spans: any,
  childrenHiddenIDs: Set<string>,
  detailStates: Map<string, DetailState | null | undefined>
): RowState[] {
  if (!spans) {
    return [];
  }
  let collapseDepth = null;
  const rowStates = [];
  for (let i = 0; i < spans.length; i++) {
    const span = spans[i];
    const { spanID, depth } = span;
    let hidden = false;
    if (collapseDepth != null) {
      if (depth >= collapseDepth) {
        hidden = true;
      } else {
        collapseDepth = null;
      }
    }
    if (hidden) {
      continue;
    }
    if (childrenHiddenIDs?.has(spanID)) {
      collapseDepth = depth + 1;
    }
    rowStates.push({
      span,
      isDetail: false,
      spanIndex: i,
    });
    if (detailStates?.has(spanID)) {
      rowStates.push({
        span,
        isDetail: true,
        spanIndex: i,
      });
    }
  }
  return rowStates;
}

function generateRowStatesFromTrace(
  trace: any,
  childrenHiddenIDs: Set<string>,
  detailStates: Map<string, DetailState | null | undefined>
): RowState[] {
  return trace ? generateRowStates(trace.spans, childrenHiddenIDs, detailStates) : [];
}

function getCssClasses(currentViewRange: [number, number]) {
  const [zoomStart, zoomEnd] = currentViewRange;
  return {
    'clipping-left': zoomStart > 0,
    'clipping-right': zoomEnd < 1,
  }
}

function mergeChildrenCriticalPath(
  trace: any,
  spanID: string,
  criticalPath: any[]
): any[] {
  if (!criticalPath) {
    return [];
  }
  // Define an array to store the IDs of the span and its descendants (if the span is collapsed)
  const allRequiredSpanIds = [spanID];

  // If the span is collapsed, recursively find all of its descendants.
  const findAllDescendants = (currentChildSpanIds: string[]) => {
    currentChildSpanIds.forEach(eachId => {
      const currentChildSpan = trace.spans.find(a => a.spanID === eachId)!;
      if (currentChildSpan.hasChildren) {
        allRequiredSpanIds.push(...currentChildSpan.childSpanIds);
        findAllDescendants(currentChildSpan.childSpanIds);
      }
    });
  };
  findAllDescendants(allRequiredSpanIds);

  const criticalPathSections: any[] = [];
  criticalPath.forEach(each => {
    if (allRequiredSpanIds.includes(each.spanId)) {
      if (criticalPathSections.length !== 0 && each.section_end === criticalPathSections[0].section_start) {
        // Merge Critical Paths if they are consecutive
        criticalPathSections[0].section_start = each.section_start;
      } else {
        criticalPathSections.unshift({ ...each });
      }
    }
  });

  return criticalPathSections;
}

const memoizedGenerateRowStates = generateRowStatesFromTrace;
const memoizedViewBoundsFunc = createViewedBoundsFunc;
const memoizedGetCssClasses = getCssClasses;

export default defineComponent({
  name: 'VirtualizedTraceViewImpl',
  props: {
    childrenToggle: Function,
    clearShouldScrollToFirstUiFindMatch: Function,
    detailLogItemToggle: Function,
    detailLogsToggle: Function,
    detailReferencesToggle: Function,
    detailProcessToggle: Function,
    detailTagsToggle: Function,
    detailToggle: Function,
    setSpanNameColumnWidth: Function,
    spanNameColumnWidth: Number,
    setTrace: Function,
    focusUiFindMatches: Function,
    currentViewRangeTime: Array,
    findMatchesIDs: Object,
    scrollToFirstVisibleSpan: Function,
    registerAccessors: Function,
    trace: Object,
    criticalPath: Array,
    childrenHiddenIDs: Array
  },
  components: {
    ListView,
    SpanBarRow,
    SpanDetailRow
  },
  setup(props: any) {

    let listView: null | undefined;

    const shouldComponentUpdate = (nextProps: VirtualizedTraceViewProps) => {
      // If any prop updates, VirtualizedTraceViewImpl should update.
      const nextPropKeys = Object.keys(nextProps) as (keyof VirtualizedTraceViewProps)[];
      for (let i = 0; i < nextPropKeys.length; i += 1) {
        if (nextProps[nextPropKeys[i]] !== props[nextPropKeys[i]]) {
          // Unless the only change was props.shouldScrollToFirstUiFindMatch changing to false.
          if (nextPropKeys[i] === 'shouldScrollToFirstUiFindMatch') {
            if (nextProps[nextPropKeys[i]]) return true;
          } else {
            return true;
          }
        }
      }
      return false;
    }

    const componentDidUpdate = (prevProps: Readonly<VirtualizedTraceViewProps>) => {
      const { registerAccessors, trace } = prevProps;
      const {
        shouldScrollToFirstUiFindMatch,
        clearShouldScrollToFirstUiFindMatch,
        scrollToFirstVisibleSpan,
        registerAccessors: nextRegisterAccessors,
        setTrace,
        trace: nextTrace,
        uiFind,
      } = props;

      if (trace !== nextTrace) {
        setTrace(nextTrace, uiFind);
      }

      if (listView && registerAccessors !== nextRegisterAccessors) {
        nextRegisterAccessors(getAccessors());
      }

      if (shouldScrollToFirstUiFindMatch) {
        scrollToFirstVisibleSpan();
        clearShouldScrollToFirstUiFindMatch();
      }
    }

    const getRowStates = () => {
      const { childrenHiddenIDs, detailStates, trace } = props;
      return memoizedGenerateRowStates(trace, childrenHiddenIDs, detailStates);
    }

    const getClippingCssClasses = (): string => {
      const { currentViewRangeTime } = props;
      return memoizedGetCssClasses(currentViewRangeTime);
    }

    const getViewedBounds = (): ViewedBoundsFunctionType => {
      const { currentViewRangeTime, trace } = props;
      const [zoomStart, zoomEnd] = currentViewRangeTime;

      return memoizedViewBoundsFunc({
        min: trace.startTime,
        max: trace.endTime,
        viewStart: zoomStart,
        viewEnd: zoomEnd,
      });
    }

    const focusSpan = (uiFind: string) => {
      const { trace, focusUiFindMatches, location, history } = props;
      if (trace) {
        updateUiFind({
          location,
          history,
          uiFind,
        });
        focusUiFindMatches(trace, uiFind, false);
      }
    };

    const getAccessors = () => {
      const lv: any = listView;
      if (!lv) {
        throw new Error('ListView unavailable');
      }
      return {
        getViewRange: getViewRange,
        getSearchedSpanIDs: getSearchedSpanIDs,
        getCollapsedChildren: getCollapsedChildren,
        getViewHeight: lv.getViewHeight,
        getBottomRowIndexVisible: lv.getBottomVisibleIndex,
        getTopRowIndexVisible: lv.getTopVisibleIndex,
        getRowPosition: lv.getRowPosition,
        mapRowIndexToSpanIndex: mapRowIndexToSpanIndex,
        mapSpanIndexToRowIndex: mapSpanIndexToRowIndex,
      };
    }

    const getViewRange = () => props.currentViewRangeTime;

    const getSearchedSpanIDs = () => props.findMatchesIDs;

    const getCollapsedChildren = () => props.childrenHiddenIDs;

    const mapRowIndexToSpanIndex = (index: number) => getRowStates()[index].spanIndex;

    const mapSpanIndexToRowIndex = (index: number) => {
      const max = getRowStates().length;
      for (let i = 0; i < max; i++) {
        const { spanIndex } = getRowStates()[i];
        if (spanIndex === index) {
          return i;
        }
      }
      throw new Error(`unable to find row for span index: ${index}`);
    };

    const setListView = (listView: any | undefined | null) => {
      const isChanged = listView !== listView;
      listView = listView;
      if (listView && isChanged) {
        props.registerAccessors(getAccessors());
      }
    };

    // use long form syntax to avert flow error
    // https://github.com/facebook/flow/issues/3076#issuecomment-290944051
    const getKeyFromIndex = (index: number) => {
      const { isDetail, span } = getRowStates()[index];
      return `${span.spanID}--${isDetail ? 'detail' : 'bar'}`;
    };

    const getIndexFromKey = (key: string) => {
      const parts = key.split('--');
      const _spanID = parts[0];
      const _isDetail = parts[1] === 'detail';
      const max = getRowStates().length;
      for (let i = 0; i < max; i++) {
        const { span, isDetail } = getRowStates()[i];
        if (span.spanID === _spanID && isDetail === _isDetail) {
          return i;
        }
      }
      return -1;
    };

    const getRowHeight = (index: number) => {
      const { span, isDetail } = getRowStates()[index];
      if (!isDetail) {
        return DEFAULT_HEIGHTS.bar;
      }
      if (Array.isArray(span.logs) && span.logs.length) {
        return DEFAULT_HEIGHTS.detailWithLogs;
      }
      return DEFAULT_HEIGHTS.detail;
    };

    const linksGetter = (span: any, items: any[], itemIndex: number) => {
      const { trace } = props;
      return getLinks(span, items, itemIndex, trace);
    };

    const renderRow = (key: string, style: any, index: number, attrs: object) => {
      const { isDetail, span, spanIndex } = getRowStates()[index];
      return isDetail
        ? renderSpanDetailRow(span, key, style, attrs)
        : renderSpanBarRow(span, spanIndex, key, style, attrs);
    };

    const renderSpanBarRow = (span: any, spanIndex: number, key: string, style: any, attrs: object) => {
      const { spanID } = span;
      const { serviceName } = span.process;
      const {
        childrenHiddenIDs,
        childrenToggle,
        detailStates,
        detailToggle,
        findMatchesIDs,
        spanNameColumnWidth,
        trace,
        criticalPath,
      } = props;

      console.log('%c ~ detailToggle ~ ', 'color:#2ecc71', detailToggle)


      if (!trace) {
        return (
          <div>VirtualizedTraceViewImpl no trace</div>
        );
      }


      // else {
      //   console.log('4444444444', 4444444444)

      //   return (

      //     <div>
      //       <div>VirtualizedTraceViewImpl renderSpanBarRow</div>
      //       <SpanBarRow
      //         getViewedBounds={getViewedBounds()}
      //       />
      //     </div>
      //   )
      // }
      const color = colorGenerator.getColorByKey(serviceName);
      const isCollapsed = childrenHiddenIDs?.has(spanID);
      const isDetailExpanded = detailStates?.has(spanID);
      const isMatchingFilter = findMatchesIDs ? findMatchesIDs.has(spanID) : false;
      const showErrorIcon = isErrorSpan(span) || (isCollapsed && spanContainsErredSpan(trace.spans, spanIndex));
      const criticalPathSections = isCollapsed
        ? mergeChildrenCriticalPath(trace, spanID, criticalPath)
        : criticalPath.filter(each => each.spanId === spanID);
      // Check for direct child "server" span if the span is a "client" span.
      let rpc = null;
      if (isCollapsed) {
        const rpcSpan = findServerChildSpan(trace.spans.slice(spanIndex));
        if (rpcSpan) {
          const rpcViewBounds = getViewedBounds()(rpcSpan.startTime, rpcSpan.startTime + rpcSpan.duration);
          rpc = {
            color: colorGenerator.getColorByKey(rpcSpan.process.serviceName),
            operationName: rpcSpan.operationName,
            serviceName: rpcSpan.process.serviceName,
            viewEnd: rpcViewBounds.end,
            viewStart: rpcViewBounds.start,
          };
        }
      }
      const peerServiceKV = span.tags.find(kv => kv.key === 'peer.service');
      // Leaf, kind == client and has peer.service tag, is likely a client span that does a request
      // to an uninstrumented/external service
      let noInstrumentedServer = null;
      if (!span.hasChildren && peerServiceKV && (isKindClient(span) || isKindProducer(span))) {
        noInstrumentedServer = {
          serviceName: peerServiceKV.value,
          color: colorGenerator.getColorByKey(peerServiceKV.value),
        };
      }

      return (
        <div class="VirtualizedTraceView--row" key={key} style={style} {...attrs}>
          <SpanBarRow
            className={getClippingCssClasses()}
            color={color}
            criticalPath={criticalPathSections}
            columnDivision={spanNameColumnWidth}
            isChildrenExpanded={!isCollapsed}
            isDetailExpanded={isDetailExpanded}
            isMatchingFilter={isMatchingFilter}
            numTicks={NUM_TICKS}
            onDetailToggled={detailToggle}
            onChildrenToggled={childrenToggle}
            rpc={rpc}
            noInstrumentedServer={noInstrumentedServer}
            showErrorIcon={showErrorIcon}
            traceStartTime={trace.startTime}
            span={span}
            focusSpan={focusSpan}
            getViewedBounds={getViewedBounds()}
          />
        </div>
      )
    }

    const renderSpanDetailRow = (span: any, key: string, style: any, attrs: object) => {
      const { spanID } = span;
      const { serviceName } = span.process;
      const {
        detailLogItemToggle,
        detailLogsToggle,
        detailProcessToggle,
        detailReferencesToggle,
        detailWarningsToggle,
        detailStates,
        detailTagsToggle,
        detailToggle,
        spanNameColumnWidth,
        trace,
      } = props;
      const detailState = detailStates?.get(spanID);
      if (!trace || !detailState) {
        return null;
      }
      const color = colorGenerator.getColorByKey(serviceName);
      return (
        <div class="VirtualizedTraceView--row" key={key} style={{ ...style, zIndex: 1 }} {...attrs}>
          <SpanDetailRow
            color={color}
            columnDivision={spanNameColumnWidth}
            onDetailToggled={detailToggle}
            detailState={detailState}
            linksGetter={linksGetter}
            logItemToggle={detailLogItemToggle}
            logsToggle={detailLogsToggle}
            processToggle={detailProcessToggle}
            referencesToggle={detailReferencesToggle}
            warningsToggle={detailWarningsToggle}
            span={span}
            tagsToggle={detailTagsToggle}
            traceStartTime={trace.startTime}
            focusSpan={focusSpan}
          />
        </div>
      )
    }

    return () => (
      <>
        <div class="VirtualizedTraceView--spans">
          <ListView
            ref={setListView}
            dataLength={getRowStates().length}
            itemHeightGetter={getRowHeight}
            itemRenderer={renderRow}
            viewBuffer={300}
            viewBufferMin={100}
            itemsWrapperClassName="VirtualizedTraceView--rowsWrapper"
            getKeyFromIndex={getKeyFromIndex}
            getIndexFromKey={getIndexFromKey}
            windowScroller
          />
        </div>
      </>
    )
  }
})

// // export from tests
// export class VirtualizedTraceViewImpl extends React.Component<VirtualizedTraceViewProps> {

// }

/* istanbul ignore next */
function mapStateToProps(state: any): any & TExtractUiFindFromStateReturn {
  return {
    ...extractUiFindFromState(state),
    ...state.traceTimeline,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: any): any {
  // return bindActionCreators(actions, dispatch) as any as TDispatchProps;
}

// export default connect<
//   TTraceTimeline & TExtractUiFindFromStateReturn,
//   TDispatchProps,
//   TVirtualizedTraceViewOwnProps,
//   ReduxState
// >(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouteProps(VirtualizedTraceViewImpl));
