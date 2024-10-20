
// import queryString from 'query-string';

// import prefixUrl from '../../../utils/prefix-url';

// export const ROUTE_PATH = prefixUrl('/trace/:id');

export function getUrl(id: string, uiFind?: string): string {
  const traceUrl = `/trace/${id}`;
  if (!uiFind) return traceUrl;

  // return `${traceUrl}?${queryString.stringify({ uiFind })}`;
  return `${traceUrl}?uiFind=${encodeURIComponent(uiFind)}`;
}

export function getLocation(id: string, state: Record<string, string> | null | undefined, uiFind?: string) {
  return {
    state,
    pathname: getUrl(id),
    search: uiFind && encodeURIComponent(uiFind),
  };
}
