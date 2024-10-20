import { Popover, Tooltip } from 'ant-design-vue';
import _groupBy from 'lodash/groupBy';

import AccordianLogs from './SpanDetail/AccordianLogs';

import { ViewedBoundsFunctionType } from './utils';

import './SpanBar.css';

type TCommonProps = {
  color: string;
  hintSide: string;
  // onClick: (evt: React.MouseEvent<any>) => void;
  onClick?: (evt: any) => void;
  criticalPath: any[];
  viewEnd: number;
  viewStart: number;
  getViewedBounds: ViewedBoundsFunctionType;
  rpc:
  | {
    viewStart: number;
    viewEnd: number;
    color: string;
  }
  | any;
  traceStartTime: number;
  span: any;
  longLabel: string;
  shortLabel: string;
};

function toPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function toPercentInDecimal(value: number) {
  return `${value * 100}%`;
}

function SpanBar(props: TCommonProps) {
  const {
    criticalPath,
    viewEnd,
    viewStart,
    getViewedBounds,
    color,
    hintSide,
    onClick,
    rpc,
    traceStartTime,
    span,
    shortLabel,
    longLabel,
  } = props;
  // group logs based on timestamps
  const logGroups = _groupBy(span.logs, log => {
    const posPercent = getViewedBounds(log.timestamp, log.timestamp).start;
    // round to the nearest 0.2%
    return toPercent(Math.round(posPercent * 500) / 500);
  });

  const [label, setLabel] = shortLabel

  const setShortLabel = () => {
    setLabel(shortLabel);
  };

  const setLongLabel = () => {
    setLabel(longLabel);
  };

  return (
    <div
      className="SpanBar--wrapper"
      onClick={onClick}
      onMouseOut={setShortLabel}
      onMouseOver={setLongLabel}
      aria-hidden
    >
      <div
        aria-label={label}
        className="SpanBar--bar"
        style={{
          background: color,
          left: toPercent(viewStart),
          width: toPercent(viewEnd - viewStart),
        }}
      >
        <div className={`SpanBar--label is-${hintSide}`}>{label}</div>
      </div>
      <div>
        {Object.keys(logGroups).map(positionKey => (
          <Popover
            key={positionKey}
            arrowPointAtCenter
            overlayClassName="SpanBar--logHint"
            placement="topLeft"
            content={
              <AccordianLogs
                interactive={false}
                isOpen
                logs={logGroups[positionKey]}
                timestamp={traceStartTime}
              />
            }
          >
            <div
              data-testid="SpanBar--logMarker"
              className="SpanBar--logMarker"
              style={{ left: positionKey, zIndex: 3 }}
            />
          </Popover>
        ))}
      </div>
      {rpc && (
        <div
          className="SpanBar--rpc"
          style={{
            background: rpc.color,
            left: toPercent(rpc.viewStart),
            width: toPercent(rpc.viewEnd - rpc.viewStart),
          }}
        />
      )}
      {criticalPath &&
        criticalPath.map((each, index) => {
          const critcalPathViewBounds = getViewedBounds(each.section_start, each.section_end);
          const criticalPathViewStart = critcalPathViewBounds.start;
          const criticalPathViewEnd = critcalPathViewBounds.end;
          const key = `${each.spanId}-${index}`;
          return (
            <Tooltip
              placement="top"
              title={
                <div>
                  A segment on the <em>critical path</em> of the overall trace/request/workflow.
                </div>
              }
            >
              <div
                key={key}
                data-testid="SpanBar--criticalPath"
                className="SpanBar--criticalPath"
                style={{
                  background: 'black',
                  left: toPercentInDecimal(criticalPathViewStart),
                  width: toPercentInDecimal(criticalPathViewEnd - criticalPathViewStart),
                }}
              />
            </Tooltip>
          );
        })}
    </div>
  );
}

export default SpanBar;
