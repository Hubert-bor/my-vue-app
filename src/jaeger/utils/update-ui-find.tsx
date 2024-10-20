// import queryString from 'query-string';

// import { History as RouterHistory, Location } from 'history';


export default function updateUiFind({
  history,
  location,
  trackFindFunction,
  uiFind,
}: {
  history: any;
  location: Location;
  trackFindFunction?: (uiFind: string | null | undefined) => void;
  uiFind?: string | null | undefined;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { uiFind: _oldUiFind, ...queryParams } = queryString.parse(location.search);
  if (trackFindFunction) trackFindFunction(uiFind);
  // if (uiFind) (queryParams as Record<string, string>).uiFind = uiFind;
  history.replace({
    ...location,
    // search: `?${queryString.stringify(queryParams)}`,
    search: `?uiFind=${uiFind}`,
  });
}
