import _uniq from 'lodash/uniq';

import { getConfigValue } from '../utils/get-config';
import { encodedStringSupplant, getParamNames } from '../utils/stringSupplant';
import { getParent } from './span';
import { Span, Link, KeyValuePair, Trace } from '../types/trace';

type ProcessedTemplate = {
  parameters: string[];
  template: (template: { [key: string]: any }) => string;
};

type ProcessedLinkPattern = {
  object: any;
  type: (link: string) => boolean;
  key: (link: string) => boolean;
  value: (value: any) => boolean;
  url: ProcessedTemplate;
  text: ProcessedTemplate;
  parameters: string[];
};

type TLinksRV = { url: string; text: string }[];

export function processTemplate(template: any, encodeFn: (unencoded: any) => string): ProcessedTemplate {
  if (typeof template !== 'string') {
    if (template && Array.isArray(template.parameters) && typeof template.template === 'function') {
      return template;
    }

    throw new Error('Invalid template');
  }
  return {
    parameters: getParamNames(template),
    template: encodedStringSupplant.bind(null, template, encodeFn),
  };
}

export function createTestFunction(entry: any) {
  if (typeof entry === 'string') {
    return (arg: any) => arg === entry;
  }
  if (Array.isArray(entry)) {
    return (arg: any) => entry.indexOf(arg) > -1;
  }
  if (entry instanceof RegExp) {
    return (arg: any) => entry.test(arg);
  }
  if (typeof entry === 'function') {
    return entry;
  }
  if (entry == null) {
    return () => true;
  }
  throw new Error(`Invalid value: ${entry}`);
}

const identity = (a: any): typeof a => a;

export function processLinkPattern(pattern: any): ProcessedLinkPattern {
  try {
    const url = processTemplate(pattern.url, encodeURIComponent);
    const text = processTemplate(pattern.text, identity);
    return {
      object: pattern,
      type: createTestFunction(pattern.type),
      key: createTestFunction(pattern.key),
      value: createTestFunction(pattern.value),
      url,
      text,
      parameters: _uniq(url.parameters.concat(text.parameters)),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Ignoring invalid link pattern: ${error}`, pattern);
    return null;
  }
}

export function getParameterInArray(name: string, array: KeyValuePair[]) {
  if (array) {
    return array.find(entry => entry.key === name);
  }
  return undefined;
}

export function getParameterInAncestor(name: string, span: Span) {
  let currentSpan: Span = span;
  while (currentSpan) {
    const result =
      getParameterInArray(name, currentSpan.tags) || getParameterInArray(name, currentSpan.process.tags);
    if (result) {
      return result;
    }
    currentSpan = getParent(currentSpan);
  }

  return undefined;
}

const getValidTraceKeys = (trace: Trace) => {
  const validKeys = (Object.keys(trace) as (keyof Trace)[]).filter(
    key => typeof trace[key] === 'string' || typeof trace[key] === 'number'
  );
  return validKeys;
}

export function getParameterInTrace(name: string, trace: Trace | undefined) {
  if (trace) {
    const validTraceKeys = getValidTraceKeys(trace);

    const key = name as keyof Trace;
    if (validTraceKeys.includes(key)) {
      return { key, value: trace[key] };
    }
  }

  return undefined;
}

function callTemplate(template: ProcessedTemplate, data: any) {
  return template.template(data);
}

export function computeTraceLink(linkPatterns: ProcessedLinkPattern[], trace: Trace) {
  const result: TLinksRV = [];

  linkPatterns
    .filter(pattern => pattern.type('traces'))
    .forEach(pattern => {
      const parameterValues: Record<string, any> = {};
      const allParameters = pattern.parameters.every(parameter => {
        const traceKV = getParameterInTrace(parameter, trace);
        if (traceKV) {
          // At this point is safe to access to trace object using parameter variable because
          // we validated parameter against validKeys, this implies that parameter a keyof Trace.
          parameterValues[parameter] = traceKV.value;
          return true;
        }
        return false;
      });
      if (allParameters) {
        result.push({
          url: callTemplate(pattern.url, parameterValues),
          text: callTemplate(pattern.text, parameterValues),
        });
      }
    });

  return result;
}

// computeLinks generates {url, text} link pairs by applying link patterms
// to the element `itemIndex` of `items` array. The values for template
// variables used in the patterns are looked up first in `items`, then
// in `span.tags` and `span.process.tags`, and then in ancestor spans
// recursively via `span.parent`.
export function computeLinks(
  linkPatterns: ProcessedLinkPattern[],
  span: Span,
  items: KeyValuePair[],
  itemIndex: number,
  trace: Trace | undefined
) {
  const item = items[itemIndex];
  let type = 'logs';
  const processTags = span.process.tags === items;
  if (processTags) {
    type = 'process';
  }
  const spanTags = span.tags === items;
  if (spanTags) {
    type = 'tags';
  }
  const result: { url: string; text: string }[] = [];
  linkPatterns.forEach(pattern => {
    if (pattern.type(type) && pattern.key(item.key) && pattern.value(item.value)) {
      const parameterValues: Record<string, any> = {};
      const allParameters = pattern.parameters.every(parameter => {
        let entry;

        if (parameter.startsWith('trace.')) {
          entry = getParameterInTrace(parameter.split('trace.')[1], trace);
        } else {
          entry = getParameterInArray(parameter, items);

          if (!entry && !processTags) {
            // do not look in ancestors for process tags because the same object may appear in different places in the hierarchy
            // and the cache in getLinks uses that object as a key
            entry = getParameterInAncestor(parameter, span);
          }
        }

        if (entry) {
          parameterValues[parameter] = entry.value;
          return true;
        }

        // eslint-disable-next-line no-console
        console.warn(
          `Skipping link pattern, missing parameter ${parameter} for key ${item.key} in ${type}.`,
          pattern.object
        );
        return false;
      });
      if (allParameters) {
        result.push({
          url: callTemplate(pattern.url, parameterValues),
          text: callTemplate(pattern.text, parameterValues),
        });
      }
    }
  });
  return result;
}

export function createGetLinks(linkPatterns: ProcessedLinkPattern[], cache: WeakMap<KeyValuePair, Link[]>) {
  return (span: Span, items: KeyValuePair[], itemIndex: number, trace: Trace | undefined) => {
    if (linkPatterns.length === 0) {
      return [];
    }
    const item = items[itemIndex];
    let result = cache.get(item);
    if (!result) {
      result = computeLinks(linkPatterns, span, items, itemIndex, trace);
      cache.set(item, result);
    }
    return result;
  };
}

export const processedLinks: ProcessedLinkPattern[] = (getConfigValue('linkPatterns') || [])
  .map(processLinkPattern)
  .filter(Boolean);

export const getTraceLinks: (trace: Trace | undefined) => TLinksRV = (
  trace: Trace | undefined
) => {
  const result: TLinksRV = [];
  if (!trace) return result;
  return computeTraceLink(processedLinks, trace);
}

export default createGetLinks(processedLinks, new WeakMap());
