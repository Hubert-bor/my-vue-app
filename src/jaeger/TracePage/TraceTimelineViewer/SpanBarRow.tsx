
import ReferencesButton from './ReferencesButton';
import TimelineRow from './TimelineHeaderRow/TimelineRow';
import TimelineRowCell from './TimelineHeaderRow/TimelineRowCell';
import { formatDuration, ViewedBoundsFunctionType } from './utils';
import SpanTreeOffset from './SpanTreeOffset';
import SpanBar from './SpanBar';
import Ticks from './Ticks';


import './SpanBarRow.css';
import { defineComponent } from 'vue';

type SpanBarRowProps = {
  className?: string;
  color: string;
  criticalPath: any[];
  columnDivision: number;
  isChildrenExpanded: boolean;
  isDetailExpanded: boolean;
  isMatchingFilter: boolean;
  onDetailToggled: (spanID: string) => void;
  onChildrenToggled: (spanID: string) => void;
  numTicks: number;
  rpc?:
  | {
    viewStart: number;
    viewEnd: number;
    color: string;
    operationName: string;
    serviceName: string;
  }
  | any;
  noInstrumentedServer?:
  | {
    color: string;
    serviceName: string;
  }
  | any;
  showErrorIcon: boolean;
  getViewedBounds: ViewedBoundsFunctionType;
  traceStartTime: number;
  span: any;
  focusSpan: (spanID: string) => void;
};

/**
 * This was originally a stateless function, but changing to a PureComponent
 * reduced the render time of expanding a span row detail by ~50%. This is
 * even true in the case where the stateless function has the same prop types as
 * this class and arrow functions are created in the stateless function as
 * handlers to the onClick props. E.g. for now, the PureComponent is more
 * performance than the stateless function.
 */

export default defineComponent({
  name: 'SpanBarRow',
  props: {
    className:String,
    color: String,
    criticalPath: Array,
    columnDivision: Number,
    isChildrenExpanded: Boolean,
    isDetailExpanded: Boolean,
    isMatchingFilter: Boolean,
    onDetailToggled: Function,
    onChildrenToggled: Function,
    numTicks: Number,
    rpc:Object,
    noInstrumentedServer:Object,
    showErrorIcon: Boolean,
    getViewedBounds:Object,
    traceStartTime: Number,
    span:Object,
    focusSpan: Function,
  },
  components: {
    TimelineRow,
    TimelineRowCell,
    SpanTreeOffset,
    ReferencesButton,
    Ticks,
    SpanBar,
  },
  setup(props:any, ctx) {
    const defaultProps = {
        className: '',
        rpc: null,
      };

const  _detailToggle = () => {
   props?.onDetailToggled?.(props.span.spanID);
  };

  const  _childrenToggle = () => {
  props.onChildrenToggled(props.span.spanID);
  };
    
    const {
      className,
      color,
      criticalPath,
      columnDivision,
      isChildrenExpanded,
      isDetailExpanded,
      isMatchingFilter,
      numTicks,
      rpc,
      noInstrumentedServer,
      showErrorIcon,
      getViewedBounds,
      traceStartTime,
      span,
      focusSpan,
    } = props;


    const {
      duration,
      hasChildren: isParent,
      operationName,
      process: { serviceName },
    } = span;
    const label = formatDuration(duration);
    const viewBounds = getViewedBounds(span.startTime, span.startTime + span?.duration);
    console.log('%c ~ viewBounds ~ ', 'color:#2ecc71', viewBounds)
    const viewStart = viewBounds.start;
    const viewEnd = viewBounds.end;

    const labelDetail = `${serviceName}::${operationName}`;
    let longLabel;
    let hintSide;
    if (viewStart > 1 - viewEnd) {
      longLabel = `${labelDetail} | ${label}`;
      hintSide = 'left';
    } else {
      longLabel = `${label} | ${labelDetail}`;
      hintSide = 'right';
    }
    const mockClassName = 'clipping-left clipping-right'


    return () => (
      <>
        <TimelineRow
          className={`span-row  ${mockClassName || ''} ${isDetailExpanded ? 'is-expanded' : ''} ${isMatchingFilter ? 'is-matching-filter' : ''}`}
          v-slots={{
            default: () => (
              <>
                <TimelineRowCell className="span-name-column" width={columnDivision}>
                  <div class={`span-name-wrapper ${isMatchingFilter ? 'is-matching-filter' : ''}`}>
                    <SpanTreeOffset
                      childrenVisible={isChildrenExpanded}
                      span={span}
                      onClick={isParent ? _childrenToggle : undefined}
                    />
                    <a
                      class={`span-name ${isDetailExpanded ? 'is-detail-expanded' : ''}`}
                      aria-checked={isDetailExpanded}
                      onClick={_detailToggle}
                      role="switch"
                      style={{ borderColor: color }}
                      tabIndex={0}
                    >
                      <span
                        class={`span-svc-name ${isParent && !isChildrenExpanded ? 'is-children-collapsed' : ''}`}
                      >
                        {/* {showErrorIcon && <IoAlert className="SpanBarRow--errorIcon" />} */}
                        {showErrorIcon && <div class="SpanBarRow--errorIcon" ></div>}
                        {serviceName}{' '}
                        {rpc && (
                          <span>
                            <div class="SpanBarRow--arrowForwardIcon"></div>
                            {/* <IoArrowForward className="SpanBarRow--arrowForwardIcon" />{' '} */}
                            <i class="SpanBarRow--rpcColorMarker" style={{ background: rpc.color }} />
                            {rpc.serviceName}
                          </span>
                        )}
                        {noInstrumentedServer && (
                          <span>
                            <div class="SpanBarRow--arrowForwardIcon"></div>

                            {/* <IoArrowForward className="SpanBarRow--arrowForwardIcon" />{' '} */}
                            <i
                              class="SpanBarRow--rpcColorMarker"
                              style={{ background: noInstrumentedServer.color }}
                            />
                            {noInstrumentedServer.serviceName}
                          </span>
                        )}
                      </span>
                      <small class="endpoint-name">{rpc ? rpc.operationName : operationName}</small>
                    </a>
                    {span.references && span.references.length > 1 && (
                      <ReferencesButton
                        references={span.references}
                        tooltipText="Contains multiple references"
                        focusSpan={focusSpan}
                      >
                        <div>IoGitNetwork</div>
                        {/* <IoGitNetwork /> */}
                      </ReferencesButton>
                    )}
                    {span.subsidiarilyReferencedBy && span.subsidiarilyReferencedBy.length > 0 && (
                      <ReferencesButton
                        references={span.subsidiarilyReferencedBy}
                        tooltipText={`This span is referenced by ${span.subsidiarilyReferencedBy.length === 1 ? 'another span' : 'multiple other spans'
                          }`}
                        focusSpan={focusSpan}
                      >
                        <div>IoCloudUploadOutline</div>
                        {/* <IoCloudUploadOutline /> */}
                      </ReferencesButton>
                    )}
                  </div>
                </TimelineRowCell>
                <TimelineRowCell
                  className="span-view"
                  style={{ cursor: 'pointer' }}
                  width={1 - columnDivision}
                  onClick={_detailToggle}
                >
                  <Ticks numTicks={numTicks} />
                  <SpanBar
                    criticalPath={criticalPath}
                    rpc={rpc}
                    viewStart={viewStart}
                    viewEnd={viewEnd}
                    getViewedBounds={getViewedBounds}
                    color={color}
                    shortLabel={label}
                    longLabel={longLabel}
                    hintSide={hintSide}
                    traceStartTime={traceStartTime}
                    span={span}
                  />
                </TimelineRowCell>
              </>
            )
          }}
        >
        </TimelineRow>
      </>
    )
  },
})

// export default class SpanBarRow extends React.PureComponent<SpanBarRowProps> {
  
// }
