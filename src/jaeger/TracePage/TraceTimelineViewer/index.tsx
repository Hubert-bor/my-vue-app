import TimelineHeaderRow from './TimelineHeaderRow';
import VirtualizedTraceView from './VirtualizedTraceView';
import { merge as mergeShortcuts } from '../keyboard-shortcuts';
import { Accessors } from '../ScrollManager';

import './index.css';
import { defineComponent, onMounted } from 'vue';

type TDispatchProps = {
  setSpanNameColumnWidth: (width: number) => void;
  collapseAll: (spans: any[]) => void;
  collapseOne: (spans: any[]) => void;
  expandAll: () => void;
  expandOne: (spans: any[]) => void;
};

type TProps = TDispatchProps & {
  registerAccessors: (accessors: Accessors) => void;
  findMatchesIDs: Set<string> | undefined | null;
  scrollToFirstVisibleSpan: () => void;
  spanNameColumnWidth: number;
  trace: any;
  criticalPath: any[];
  updateNextViewRangeTime: (update: any) => void;
  updateViewRangeTime: any;
  viewRange: any;
};

const NUM_TICKS = 5;

/**
 * `TraceTimelineViewer` now renders the header row because it is sensitive to
 * `props.viewRange.time.cursor`. If `VirtualizedTraceView` renders it, it will
 * re-render the ListView every time the cursor is moved on the trace minimap
 * or `TimelineHeaderRow`.
 */

export default defineComponent({
  name: 'TraceTimelineViewerImpl',
  components: { TimelineHeaderRow, VirtualizedTraceView },
  props: {
    trace: Object,
    viewRange: Object,
    registerAccessors: Function,
    findMatchesIDs: Object,
    scrollToFirstVisibleSpan: Function,
    spanNameColumnWidth: { type: Number, default: 0.25 },
    criticalPath: String,
    updateNextViewRangeTime: Function,
    updateViewRangeTime: Object,
  },
  setup(props: any) {

    const collapseAll = () => {
      props.collapseAll(props.trace.spans);
    };

    const collapseOne = () => {
      props.collapseOne(props.trace.spans);
    };

    const expandAll = () => {
      props.expandAll();
    };

    const expandOne = () => {
      props.expandOne(props.trace.spans);
    };

    const { setSpanNameColumnWidth, updateNextViewRangeTime, updateViewRangeTime, viewRange, ...rest } =
      props;
    const { spanNameColumnWidth, trace } = rest;
    console.log('%c ~ rest ~ ', 'color:#2ecc71', rest)

    onMounted(() => {
      mergeShortcuts({
        collapseAll: collapseAll,
        expandAll: expandAll,
        collapseOne: collapseOne,
        expandOne: expandOne,
      });
    })

    return () => (
      <>
        <div class="TraceTimelineViewer">
          <TimelineHeaderRow
            duration={trace.duration}
            nameColumnWidth={spanNameColumnWidth}
            numTicks={NUM_TICKS}
            onCollapseAll={collapseAll}
            onCollapseOne={collapseOne}
            onColummWidthChange={setSpanNameColumnWidth}
            onExpandAll={expandAll}
            onExpandOne={expandOne}
            viewRangeTime={viewRange.time}
            updateNextViewRangeTime={updateNextViewRangeTime}
            updateViewRangeTime={updateViewRangeTime}
          />
          <VirtualizedTraceView {...rest} currentViewRangeTime={viewRange.time.current} />
        </div>
      </>
    )
  }
})


// function mapStateToProps(state: any) {
//   const spanNameColumnWidth = state.traceTimeline.spanNameColumnWidth;
//   return { spanNameColumnWidth };
// }

// function mapDispatchToProps(dispatch: any): TDispatchProps {
//   const { setSpanNameColumnWidth, expandAll, expandOne, collapseAll, collapseOne } = bindActionCreators(
//     actions,
//     dispatch
//   );
//   return { setSpanNameColumnWidth, expandAll, expandOne, collapseAll, collapseOne };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TraceTimelineViewerImpl);
