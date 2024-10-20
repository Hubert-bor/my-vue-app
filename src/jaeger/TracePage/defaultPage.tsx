import _clamp from 'lodash/clamp';
import _get from 'lodash/get';
import _mapValues from 'lodash/mapValues';
import _memoize from 'lodash/memoize';

// import ArchiveNotifier from './ArchiveNotifier';
import { actions as archiveActions } from './ArchiveNotifier/duck';
import { trackFilter, trackFocusMatches, trackNextMatch, trackPrevMatch, trackRange } from './index.track';
// import {
//   CombokeysHandler,
//   merge as mergeShortcuts,
//   reset as resetShortcuts,
//   ShortcutCallbacks,
// } from './keyboard-shortcuts';
import { cancel as cancelScroll, scrollBy, scrollTo } from './scroll-page';
import ScrollManager from './ScrollManager';
// import calculateTraceDagEV from './TraceGraph/calculateTraceDagEV';
// import TraceGraph from './TraceGraph/TraceGraph';
// import { TEv } from './TraceGraph/types';
import { trackSlimHeaderToggle } from './TracePageHeader/TracePageHeader.track';
import TracePageHeader from './TracePageHeader';
import TraceTimelineViewer from './TraceTimelineViewer';
import { actions as timelineActions } from './TraceTimelineViewer/duck';
import { TUpdateViewRangeTimeFunction, IViewRange, ViewRangeTimeUpdate, ETraceViewType } from './types';
import { getLocation, getUrl } from './url';
// import ErrorMessage from '../common/ErrorMessage';
import LoadingIndicator from '../common/LoadingIndicator';
// import { extractUiFindFromState } from '../common/UiFindInput';
// import { getUiFindVertexKeys } from '../common/traceDiffGraphUtils';
import { fetchedState } from '../constants';
import filterSpans from '../utils/filter-spans';
import updateUiFind from '../utils/update-ui-find';
import TraceStatistics from './TraceStatistics/index';
// import TraceSpanView from './TraceSpanView/index';
import TraceFlamegraph from './TraceFlamegraph/index';

import './index.css';
import memoizedTraceCriticalPath from './CriticalPath/index';
import withRouteProps from '../utils/withRouteProps';
import { defineComponent, onMounted, onUnmounted, onUpdated, ref } from 'vue';

type TDispatchProps = {
  acknowledgeArchive: (id: string) => void;
  archiveTrace: (id: string) => void;
  fetchTrace: (id: string) => void;
  focusUiFindMatches: (trace: any, uiFind: any) => void;
};

type TOwnProps = {
  history: any;
  location: any;
  params: { id: string };
};

type TReduxProps = {
  archiveEnabled: boolean;
  storageCapabilities: any;
  archiveTraceState: any;
  criticalPathEnabled: boolean;
  embedded: any;
  id: string;
  searchUrl: null | string;
  disableJsonView: boolean;
  trace: any;
  uiFind: string | null | undefined;
  traceGraphConfig?: any;
};

type TProps = TDispatchProps & TOwnProps & TReduxProps;

type TState = {
  headerHeight: number | null | undefined;
  slimView: boolean;
  viewType: ETraceViewType;
  viewRange: IViewRange;
};

// export for tests
export const VIEW_MIN_RANGE = 0.01;
const VIEW_CHANGE_BASE = 0.005;
const VIEW_CHANGE_FAST = 0.05;

// export for tests
export const shortcutConfig: { [name: string]: [number, number] } = {
  panLeft: [-VIEW_CHANGE_BASE, -VIEW_CHANGE_BASE],
  panLeftFast: [-VIEW_CHANGE_FAST, -VIEW_CHANGE_FAST],
  panRight: [VIEW_CHANGE_BASE, VIEW_CHANGE_BASE],
  panRightFast: [VIEW_CHANGE_FAST, VIEW_CHANGE_FAST],
  zoomIn: [VIEW_CHANGE_BASE, -VIEW_CHANGE_BASE],
  zoomInFast: [VIEW_CHANGE_FAST, -VIEW_CHANGE_FAST],
  zoomOut: [-VIEW_CHANGE_BASE, VIEW_CHANGE_BASE],
  zoomOutFast: [-VIEW_CHANGE_FAST, VIEW_CHANGE_FAST],
};

// export for tests
export function makeShortcutCallbacks(adjRange: (start: number, end: number) => void) {
  function getHandler([startChange, endChange]: [number, number]) {
    return function combokeyHandler(event: any) {
      event.preventDefault();
      adjRange(startChange, endChange);
    };
  }
  return _mapValues(shortcutConfig, getHandler);
}


export default defineComponent({
  name: 'TracePageImpl',
  setup(props: any) {

    let _headerElm: HTMLElement | null | undefined;
    let _filterSpans: typeof filterSpans;
    const _searchBar = ref()
    let _scrollManager: ScrollManager;
    let traceDagEV: null | undefined;

    const { embedded, trace } = props;
    const state = {
      headerHeight: null,
      slimView: Boolean(embedded && embedded.timeline.collapseTitle),
      viewType: ETraceViewType.TraceTimelineViewer,
      viewRange: {
        time: {
          current: [0, 1],
        },
      },
    };
    _headerElm = null;
    _filterSpans = _memoize(
      filterSpans,
      // Do not use the memo if the filter text or trace has changed.
      // trace.data.spans is populated after the initial render via mutation.
      textFilter =>
        `${textFilter} ${_get(props.trace, 'traceID')} ${_get(props.trace, 'data.spans.length')}`
    );
    _scrollManager = new ScrollManager(trace && trace.data, {
      scrollBy,
      scrollTo,
    });
    // resetShortcuts();

    onMounted(() => {
      ensureTraceFetched();
      updateViewRangeTime(0, 1);
      /* istanbul ignore if */
      if (!_scrollManager) {
        throw new Error('Invalid state - scrollManager is unset');
      }
      const { scrollPageDown, scrollPageUp, scrollToNextVisibleSpan, scrollToPrevVisibleSpan } =
        _scrollManager;
      const adjViewRange = (a: number, b: number) => _adjustViewRange(a, b, 'kbd');
      const shortcutCallbacks = makeShortcutCallbacks(adjViewRange);
      shortcutCallbacks.scrollPageDown = scrollPageDown;
      shortcutCallbacks.scrollPageUp = scrollPageUp;
      shortcutCallbacks.scrollToNextVisibleSpan = scrollToNextVisibleSpan;
      shortcutCallbacks.scrollToPrevVisibleSpan = scrollToPrevVisibleSpan;
      shortcutCallbacks.clearSearch = clearSearch;
      shortcutCallbacks.searchSpans = focusOnSearchBar;
      // mergeShortcuts(shortcutCallbacks);
    })

    onUpdated(() => {
      const { id, trace } = props;

      _scrollManager.setTrace(trace && trace.data);

      setHeaderHeight(_headerElm);
      if (!trace) {
        ensureTraceFetched();
        return;
      }
      // if (prevID !== id) {
      //   updateViewRangeTime(0, 1);
      //   clearSearch();
      // }
    })

    onUnmounted(() => {
      // resetShortcuts();
      cancelScroll();
      _scrollManager.destroy();
      _scrollManager = new ScrollManager(undefined, {
        scrollBy,
        scrollTo,
      });
    })

    const _adjustViewRange = (startChange: number, endChange: number, trackSrc: string) => {
      const [viewStart, viewEnd] = state.viewRange.time.current;
      let start = _clamp(viewStart + startChange, 0, 0.99);
      let end = _clamp(viewEnd + endChange, 0.01, 1);
      if (end - start < VIEW_MIN_RANGE) {
        if (startChange < 0 && endChange < 0) {
          end = start + VIEW_MIN_RANGE;
        } else if (startChange > 0 && endChange > 0) {
          end = start + VIEW_MIN_RANGE;
        } else {
          const center = viewStart + (viewEnd - viewStart) / 2;
          start = center - VIEW_MIN_RANGE / 2;
          end = center + VIEW_MIN_RANGE / 2;
        }
      }
      updateViewRangeTime(start, end, trackSrc);
    }

    const setHeaderHeight = (elm: HTMLElement | null | undefined) => {
      _headerElm = elm;
      if (elm) {
        if (state.headerHeight !== elm.clientHeight) {
          // setState({ headerHeight: elm.clientHeight });
        }
      } else if (state.headerHeight) {
        // setState({ headerHeight: null });
      }
    };

    const clearSearch = () => {
      const { history, location } = props;
      updateUiFind({
        history,
        location,
        trackFindFunction: trackFilter,
      });
      if (_searchBar.value) _searchBar.value.blur();
    };

    const focusOnSearchBar = () => {
      if (_searchBar.value) _searchBar.value.focus();
    };

    const updateViewRangeTime: TUpdateViewRangeTimeFunction = (start: number, end: number, trackSrc?: string) => {
      if (trackSrc) {
        trackRange(trackSrc, [start, end], state.viewRange.time.current as any);
      }
      const current: [number, number] = [start, end];
      const time = { current };
      // setState((state: TState) => ({ viewRange: { ...state.viewRange, time } }));
    };

    const updateNextViewRangeTime = (update: ViewRangeTimeUpdate) => {
      // setState((state: TState) => {
      //   const time = { ...state.viewRange.time, ...update };
      //   return { viewRange: { ...state.viewRange, time } };
      // });
    };

    const toggleSlimView = () => {
      const { slimView } = state;
      trackSlimHeaderToggle(!slimView);
      // setState({ slimView: !slimView });
    };

    // const setTraceView = (viewType: ETraceViewType) => {
    //   if (props.trace && props.trace.data && viewType === ETraceViewType.TraceGraph) {
    //     traceDagEV = calculateTraceDagEV(props.trace.data);
    //   }
    //   // setState({ viewType });
    // };

    const archiveTrace = () => {
      const { id, archiveTrace } = props;
      archiveTrace(id);
    };

    const acknowledgeArchive = () => {
      const { id, acknowledgeArchive } = props;
      acknowledgeArchive(id);
    };

    const ensureTraceFetched = () => {
      const { fetchTrace, location, trace, id } = props;
      if (!trace) {
        fetchTrace(id);
        return;
      }
      const { history } = props;
      if (id && id !== id.toLowerCase()) {
        history.replace(getLocation(id.toLowerCase(), location.state));
      }
    }

    const focusUiFindMatches = () => {
      const { trace, focusUiFindMatches, uiFind } = props;
      if (trace && trace.data) {
        trackFocusMatches();
        focusUiFindMatches(trace.data, uiFind);
      }
    }

    const nextResult = () => {
      trackNextMatch();
      _scrollManager.scrollToNextVisibleSpan();
    }

    const prevResult = () => {
      trackPrevMatch();
      _scrollManager.scrollToPrevVisibleSpan();
    }

    const {
      archiveEnabled,
      storageCapabilities,
      archiveTraceState,
      criticalPathEnabled,
      id,
      uiFind,
      disableJsonView,
      traceGraphConfig,
      location: { state: locationState },
    } = props;
    const { slimView, viewType, headerHeight, viewRange } = state;
    if (!trace || trace.state === fetchedState.LOADING) {
      return <LoadingIndicator className="u-mt-vast" centered />;
    }
    const { data } = trace;
    if (trace.state === fetchedState.ERROR || !data) {
      // return <ErrorMessage className="ub-m3" error={trace.error || 'Unknown error'} />;
      return <div>Error</div>
    }

    let findCount = 0;
    let graphFindMatches: Set<string> | null | undefined;
    let spanFindMatches: Set<string> | null | undefined;
    if (uiFind) {
      if (viewType === ETraceViewType.TraceGraph) {
        // graphFindMatches = getUiFindVertexKeys(uiFind, _get(traceDagEV, 'vertices', []));
        findCount = graphFindMatches ? graphFindMatches.size : 0;
      } else {
        spanFindMatches = _filterSpans(uiFind, _get(trace, 'data.spans'));
        findCount = spanFindMatches ? spanFindMatches.size : 0;
      }
    }

    const isEmbedded = Boolean(embedded);
    const hasArchiveStorage = Boolean(storageCapabilities?.archiveStorage);
    const headerProps = {
      focusUiFindMatches: focusUiFindMatches,
      slimView,
      textFilter: uiFind,
      viewType,
      viewRange,
      canCollapse: !embedded || !embedded.timeline.hideSummary || !embedded.timeline.hideMinimap,
      clearSearch: clearSearch,
      hideMap: Boolean(
        viewType !== ETraceViewType.TraceTimelineViewer || (embedded && embedded.timeline.hideMinimap)
      ),
      hideSummary: Boolean(embedded && embedded.timeline.hideSummary),
      linkToStandalone: getUrl(id),
      nextResult: nextResult,
      onArchiveClicked: archiveTrace,
      onSlimViewClicked: toggleSlimView,
      // onTraceViewChange: setTraceView,
      prevResult: prevResult,
      ref: _searchBar,
      resultCount: findCount,
      disableJsonView,
      showArchiveButton: !isEmbedded && archiveEnabled && hasArchiveStorage,
      showShortcutsHelp: !isEmbedded,
      showStandaloneLink: isEmbedded,
      showViewOptions: !isEmbedded,
      toSearch: (locationState && locationState.fromSearch) || null,
      trace: data,
      updateNextViewRangeTime: updateNextViewRangeTime,
      updateViewRangeTime: updateViewRangeTime,
    };

    let view;
    const criticalPath = criticalPathEnabled ? memoizedTraceCriticalPath(data) : [];
    if (ETraceViewType.TraceTimelineViewer === viewType && headerHeight) {
      view = (
        <TraceTimelineViewer
          registerAccessors={_scrollManager.setAccessors}
          scrollToFirstVisibleSpan={_scrollManager.scrollToFirstVisibleSpan}
          findMatchesIDs={spanFindMatches}
          trace={data}
          criticalPath={criticalPath}
          updateNextViewRangeTime={updateNextViewRangeTime}
          updateViewRangeTime={updateViewRangeTime}
          viewRange={viewRange}
        />
      );
    } else if (ETraceViewType.TraceGraph === viewType && headerHeight) {
      // view = (
      //   <TraceGraph
      //     headerHeight={headerHeight}
      //     ev={traceDagEV}
      //     uiFind={uiFind}
      //     uiFindVertexKeys={graphFindMatches}
      //     traceGraphConfig={traceGraphConfig}
      //   />
      // );
    } else if (ETraceViewType.TraceStatistics === viewType && headerHeight) {
      // view = <TraceStatistics trace={data} uiFindVertexKeys={spanFindMatches} uiFind={uiFind} />;
    } else if (ETraceViewType.TraceSpansView === viewType && headerHeight) {
      // view = <TraceSpanView trace={data} uiFindVertexKeys={spanFindMatches} uiFind={uiFind} />;
    } else if (ETraceViewType.TraceFlamegraph === viewType && headerHeight) {
      view = <TraceFlamegraph trace={trace} />;
    }



    return () => (
      <>
        <div>
          {/* {archiveEnabled && (
            <ArchiveNotifier acknowledge={acknowledgeArchive} archivedState={archiveTraceState} />
          )} */}
          <div className="Tracepage--headerSection" ref={setHeaderHeight}>
            <TracePageHeader {...headerProps} />
          </div>
          {headerHeight ? <section style={{ paddingTop: headerHeight }}>{view}</section> : null}
        </div>
      </>
    );
  }
})

// export for tests
// export class TracePageImpl extends React.PureComponent<TProps, TState> {

// }

// export for tests
export function mapStateToProps(state: any, ownProps: TOwnProps): any {
  const { id } = ownProps.params;
  const { archive, config, embedded, router } = state;
  const { traces } = state.trace;
  const trace = id ? traces[id] : null;
  const archiveTraceState = id ? archive[id] : null;
  const archiveEnabled = Boolean(config.archiveEnabled);
  const storageCapabilities = config.storageCapabilities;
  const { disableJsonView, criticalPathEnabled } = config;
  const { state: locationState } = router.location;
  const searchUrl = (locationState && locationState.fromSearch) || null;
  const { traceGraph: traceGraphConfig } = config;

  return {
    archiveEnabled,
    storageCapabilities,
    archiveTraceState,
    criticalPathEnabled,
    embedded,
    id,
    searchUrl,
    disableJsonView,
    trace,
    traceGraphConfig,
  };
}

// export for tests
export function mapDispatchToProps(dispatch: any) {
  // const { fetchTrace } = bindActionCreators(jaegerApiActions, dispatch);
  // const { archiveTrace, acknowledge: acknowledgeArchive } = bindActionCreators(archiveActions, dispatch);
  // const { focusUiFindMatches } = bindActionCreators(timelineActions, dispatch);
  // return { acknowledgeArchive, archiveTrace, fetchTrace, focusUiFindMatches };
}

// export default withRouteProps(connect(mapStateToProps, mapDispatchToProps)(TracePageImpl));
