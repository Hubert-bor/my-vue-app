import _get from 'lodash/get';

// import processDeprecation from './process-deprecation';
// import defaultConfig, { deprecations, mergeFields } from '../constants/index';

function getUiConfig() {
  const getter = window.getJaegerUiConfig;
  if (typeof getter !== 'function') {
    // eslint-disable-next-line no-console
    console.warn('Embedded config not available');
    return {};
  }
  return getter();
}

function getCapabilities() {
  const getter = window.getJaegerStorageCapabilities;
  const capabilities = typeof getter === 'function' ? getter() : null;
  return capabilities ?? defaultConfig.storageCapabilities;
}

/**
 * Merge the embedded config from the query service (if present) with the
 * default config from `../../constants/default-config`.
 */
const getConfig = function getConfig() {
  const capabilities = getCapabilities();

  const embedded = getUiConfig();
  if (!embedded) {
    return { storageCapabilities: capabilities };
  }
  // check for deprecated config values
  // if (Array.isArray(deprecations)) {
  //   deprecations.forEach(deprecation => processDeprecation(embedded, deprecation, true));
  // }
  const rv = { ...embedded };
  // mergeFields config values should be merged instead of fully replaced
  [].forEach(key => {
    if (embedded && typeof embedded[key] === 'object' && embedded[key] !== null) {
      rv[key] = { ...embedded[key] };
    }
  });
  return { ...rv, storageCapabilities: capabilities };
}

export default getConfig;

export function getConfigValue(path: string) {
  return _get(getConfig(), path);
}
