import SpanDetail from './SpanDetail';
import DetailState from './SpanDetail/DetailState';
import SpanTreeOffset from './SpanTreeOffset';

import TimelineRow from './TimelineHeaderRow/TimelineRow';
import TimelineRowCell from './TimelineHeaderRow/TimelineRowCell';

import './SpanDetailRow.css';
import { defineComponent } from 'vue';

type SpanDetailRowProps = {
  color: string;
  columnDivision: number;
  detailState: DetailState;
  onDetailToggled: (spanID: string) => void;
  linksGetter: (span: any, links: any[], index: number) => any[];
  logItemToggle: (spanID: string, log: any) => void;
  logsToggle: (spanID: string) => void;
  processToggle: (spanID: string) => void;
  referencesToggle: (spanID: string) => void;
  warningsToggle: (spanID: string) => void;
  span: any;
  tagsToggle: (spanID: string) => void;
  traceStartTime: number;
  focusSpan: (uiFind: string) => void;
};

export default defineComponent({
  name: 'SpanDetailRow',
  props: {
    color: String,
    columnDivision: Number,
    detailState: Object,
    onDetailToggled: Function,
    linksGetter: Function,
    logItemToggle: Function,
    logsToggle: Function,
    processToggle: Function,
    referencesToggle: Function,
    warningsToggle: Function,
    span: Object,
    tagsToggle: Function,
    traceStartTime: Number,
    focusSpan: Function
  },
  components: { TimelineRow, TimelineRowCell, SpanDetail },
  setup(props: any, ctx) {
    const _detailToggle = () => {
      props?.onDetailToggled(props.span.spanID);
    };

    const _linksGetter = (items: any[], itemIndex: number) => {
      const { linksGetter, span } = props;
      return linksGetter(span, items, itemIndex);
    };

    const {
      color,
      columnDivision,
      detailState,
      logItemToggle,
      logsToggle,
      processToggle,
      referencesToggle,
      warningsToggle,
      span,
      tagsToggle,
      traceStartTime,
      focusSpan,
    } = props;

    return () => (
      <>
        <TimelineRow className="detail-row" v-slots={{
          default: () => (
            <>
              <TimelineRowCell width={columnDivision}>
                <SpanTreeOffset span={span} showChildrenIcon={false} />
                <span>
                  <span
                    class="detail-row-expanded-accent"
                    aria-checked="true"
                    onClick={_detailToggle}
                    role="switch"
                    style={{ borderColor: color }}
                  />
                </span>
              </TimelineRowCell>
              <TimelineRowCell width={1 - columnDivision}>
                <div class="detail-info-wrapper" style={{ borderTopColor: color }}>
                  <SpanDetail
                    detailState={detailState}
                    linksGetter={_linksGetter}
                    logItemToggle={logItemToggle}
                    logsToggle={logsToggle}
                    processToggle={processToggle}
                    referencesToggle={referencesToggle}
                    warningsToggle={warningsToggle}
                    span={span}
                    tagsToggle={tagsToggle}
                    traceStartTime={traceStartTime}
                    focusSpan={focusSpan}
                  />
                </div>
              </TimelineRowCell>
            </>
          )
        }}>
        </TimelineRow>
      </>
    )
  },
})

