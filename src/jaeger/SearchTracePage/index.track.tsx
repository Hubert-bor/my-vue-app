// export for tests
export const CATEGORY_ALT_VIEW = 'jaeger/ux/search-results/alt-view';
export const CATEGORY_CONVERSIONS = 'jaeger/ux/search-results/conversions';

export enum EAltViewActions {
  Ddg = 'ddg',
  Traces = 'traces',
}

export function trackAltView(view: EAltViewActions) {
}

export function trackConversions(view: EAltViewActions) {
}
