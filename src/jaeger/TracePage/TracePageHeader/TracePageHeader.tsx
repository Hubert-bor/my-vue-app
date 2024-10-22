
import { Button } from 'ant-design-vue';
import _get from 'lodash/get';
import _maxBy from 'lodash/maxBy';
import _values from 'lodash/values';
// import { IoArrowBack, IoFileTrayFull, IoChevronForward } from 'react-icons/io5';
// import { Link } from 'react-router-dom';

// import { Helmet } from 'react-helmet';
import AltViewOptions from './AltViewOptions';
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp';
import SpanGraph from './SpanGraph';
import TracePageSearchBar from './TracePageSearchBar';
import { TUpdateViewRangeTimeFunction, IViewRange, ViewRangeTimeUpdate, ETraceViewType } from '../types';
import LabeledList from '../../common/LabeledList';
// import NewWindowIcon from '../../common/NewWindowIcon';
import TraceName from '../../common/TraceName';
import { formatDatetime, formatDuration } from '../../utils/date';
import { getTraceLinks } from '../../model/link-patterns';

import './TracePageHeader.css';
import { defineComponent } from 'vue';
// import ExternalLinks from '../../common/ExternalLinks';
// import { getTargetEmptyOrBlank } from '../../../utils/config/get-target';

type TracePageHeaderEmbedProps = {
  canCollapse: boolean;
  clearSearch: () => void;
  focusUiFindMatches: () => void;
  hideMap: boolean;
  hideSummary: boolean;
  linkToStandalone: string;
  nextResult: () => void;
  onArchiveClicked: () => void;
  onSlimViewClicked: () => void;
  onTraceViewChange: (viewType: ETraceViewType) => void;
  prevResult: () => void;
  resultCount: number;
  showArchiveButton: boolean;
  showShortcutsHelp: boolean;
  showStandaloneLink: boolean;
  disableJsonView: boolean;
  showViewOptions: boolean;
  slimView: boolean;
  textFilter: string;
  toSearch: string | null;
  trace: any;
  viewType: ETraceViewType;
  updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
  updateViewRangeTime: TUpdateViewRangeTimeFunction;
  viewRange: IViewRange;
};

export const HEADER_ITEMS = [
  {
    key: 'timestamp',
    label: 'Trace Start',
    renderer: (trace: any) => {
      const dateStr = formatDatetime(trace.startTime);
      const match = dateStr.match(/^(.+)(\.\d+)$/);
      return match ? (
        <span class="TracePageHeader--overviewItem--value">
          {match[1]}
          <span class="TracePageHeader--overviewItem--valueDetail">{match[2]}</span>
        </span>
      ) : (
        dateStr
      );
    },
  },
  {
    key: 'duration',
    label: 'Duration',
    renderer: (trace: any) => formatDuration(trace.duration),
  },
  {
    key: 'service-count',
    label: 'Services',
    renderer: (trace: any) => new Set(_values(trace.processes).map(p => p.serviceName)).size,
  },
  {
    key: 'depth',
    label: 'Depth',
    renderer: (trace: any) => _get(_maxBy(trace.spans, 'depth'), 'depth', 0) + 1,
  },
  {
    key: 'span-count',
    label: 'Total Spans',
    renderer: (trace: any) => trace.spans.length,
  },
];

export default defineComponent({
  name: "TracePageHeaderFn",
  props: {
    trace: { type: Object },
    viewRange: { type: Object },
    updateViewRangeTime: { type: Function },
    updateNextViewRangeTime: { type: Function },
  },
  components: {
    TracePageSearchBar,
    KeyboardShortcutsHelp,
    LabeledList,
    SpanGraph,
    TraceName,
    AltViewOptions
  },
  setup(props:any, ctx) {
    const {
      canCollapse,
      clearSearch,
      focusUiFindMatches,
      forwardedRef,
      hideMap,
      hideSummary,
      linkToStandalone,
      nextResult,
      onArchiveClicked,
      onSlimViewClicked,
      onTraceViewChange,
      prevResult,
      resultCount,
      showArchiveButton,
      showShortcutsHelp,
      showStandaloneLink,
      showViewOptions,
      disableJsonView,
      slimView,
      textFilter,
      toSearch,
      trace,
      viewType,
      updateNextViewRangeTime,
      updateViewRangeTime,
      viewRange,
    } = props;

    if (!trace) {
      return () => (
        <>
          <div>no trace</div>
        </>
      )
    }

    const links = getTraceLinks(trace);

    const summaryItems =
      !hideSummary &&
      !slimView &&
      HEADER_ITEMS.map(item => {
        const { renderer, ...rest } = item;
        return { ...rest, value: renderer(trace) };
      });

    const traceShortID = trace.traceID.slice(0, 7);

    const title = (
      <h1 class={`TracePageHeader--title ${canCollapse ? 'is-collapsible' : ''}`}>
        <TraceName traceName={trace.traceName} /> <small class="u-tx-muted">{traceShortID}</small>
      </h1>
    );

    return () => (
      <>
        <header class="TracePageHeader">
          <div title={`${trace.traceEmoji} ${traceShortID}: ${trace.tracePageTitle} — Jaeger UI`} ></div>
          <div class="TracePageHeader--titleRow">
            {toSearch && (
              <div class="TracePageHeader--back" to={toSearch}>
                {/* <IoArrowBack /> */}1333
              </div>
            )}
            {/* {links && links.length > 0 && <ExternalLinks links={links} />} */}
            {canCollapse ? (
              <a
                class="TracePageHeader--titleLink"
                onClick={onSlimViewClicked}
                role="switch"
                aria-checked={!slimView}
              >
                2
                {/* <IoChevronForward class={`TracePageHeader--detailToggle ${!slimView ? 'is-expanded' : ''}`} /> */}
                {title}
              </a>
            ) : (
              title
            )}
            <TracePageSearchBar
              clearSearch={clearSearch}
              focusUiFindMatches={focusUiFindMatches}
              nextResult={nextResult}
              prevResult={prevResult}
              ref={forwardedRef}
              resultCount={resultCount}
              textFilter={textFilter}
              navigable={viewType === ETraceViewType.TraceTimelineViewer}
            />
            {showShortcutsHelp && <KeyboardShortcutsHelp class="ub-m2" />}
            {showViewOptions && (
              <AltViewOptions
                disableJsonView={disableJsonView}
                onTraceViewChange={onTraceViewChange}
                traceID={trace.traceID}
                viewType={viewType}
              />
            )}
            {showArchiveButton && (
              <Button class="ub-mr2 ub-flex ub-items-center" htmlType="button" onClick={onArchiveClicked}>
                {/* <IoFileTrayFull class="TracePageHeader--archiveIcon" /> */}
                Archive Trace
              </Button>
            )}
            {showStandaloneLink && (
              <div
                class="u-tx-inherit ub-nowrap ub-mx2"
                to={linkToStandalone}
                rel="noopener noreferrer"
              >
                22
                {/* <NewWindowIcon isLarge /> */}
              </div>
            )}
          </div>
          {summaryItems && <LabeledList className="TracePageHeader--overviewItems" items={summaryItems} />}
          
          <SpanGraph
            trace={trace}
            viewRange={viewRange}
            updateNextViewRangeTime={updateNextViewRangeTime}
            updateViewRangeTime={updateViewRangeTime}
          />
        </header>
      </>
    )
  },
})
// export function TracePageHeaderFn(props: TracePageHeaderEmbedProps & { forwardedRef: any }) {
 
// }

// export default React.forwardRef((props: TracePageHeaderEmbedProps, ref: React.Ref<InputRef>) => (
//   <TracePageHeaderFn {...props} forwardedRef={ref} />
// ));
