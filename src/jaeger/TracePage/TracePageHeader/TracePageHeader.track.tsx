// export for tests
export const CATEGORY_ALT_VIEW = 'jaeger/ux/trace/alt-view';
export const CATEGORY_SLIM_HEADER = 'jaeger/ux/trace/slim-header';


export const OPEN = 'open';
export const CLOSE = 'close';

export function getToggleValue(value: boolean) {
  return value ? CLOSE : OPEN;
}

// export for tests
export const ACTION_GANTT = 'gantt';
export const ACTION_GRAPH = 'graph';
export const ACTION_JSON = 'json';
export const ACTION_RAW_JSON = 'rawJson';
export const ACTION_STATISTICS = 'traceStatistics';
export const ACTION_TRACE_SPANS_VIEW = 'tracesSpansView';

// use a closure instead of bind to prevent forwarding any arguments to trackEvent()
export const trackGanttView = () => console.log(CATEGORY_ALT_VIEW, ACTION_GANTT);
export const trackGraphView = () => console.log(CATEGORY_ALT_VIEW, ACTION_GRAPH);
export const trackJsonView = () => console.log(CATEGORY_ALT_VIEW, ACTION_JSON);
export const trackRawJsonView = () => console.log(CATEGORY_ALT_VIEW, ACTION_RAW_JSON);
export const trackStatisticsView = () => console.log(CATEGORY_ALT_VIEW, ACTION_STATISTICS);
export const trackTraceSpansView = () => console.log(CATEGORY_ALT_VIEW, ACTION_TRACE_SPANS_VIEW);

export const trackSlimHeaderToggle = (isOpen: boolean) =>
  console.log(CATEGORY_SLIM_HEADER, getToggleValue(isOpen));
