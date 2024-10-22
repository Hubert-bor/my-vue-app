import getTrackFilter from '../utils/tracking/getTrackFilter';

// export for tests
export const CATEGORY_FILTER = 'jaeger/ux/trace/filter';
export const CATEGORY_MATCH_INTERACTIONS = 'jaeger/ux/trace/match-interactions';
export const CATEGORY_RANGE = 'jaeger/ux/trace/range';

// export for tests
export const ACTION_FOCUS = 'focus';
export const ACTION_NEXT = 'next';
export const ACTION_PREV = 'previous';
export const ACTION_RANGE_REFRAME = 'reframe';
export const ACTION_RANGE_SHIFT = 'shift';


export const trackFilter = getTrackFilter(CATEGORY_FILTER);

export function trackFocusMatches() {
}

export function trackNextMatch() {
}

export function trackPrevMatch() {
}

function getRangeAction(current: [number, number], next: [number, number]) {
  const [curStart, curEnd] = current;
  const [nxStart, nxEnd] = next;
  if (curStart === nxStart || curEnd === nxEnd) {
    return ACTION_RANGE_SHIFT;
  }
  const dStart = (curStart - nxStart).toPrecision(7);
  const dEnd = (curEnd - nxEnd).toPrecision(7);
  if (dStart === dEnd) {
    return ACTION_RANGE_SHIFT;
  }
  return ACTION_RANGE_REFRAME;
}

export function trackRange(source: string, current: [number, number], next: [number, number]) {
  const action = getRangeAction(current, next);
}
