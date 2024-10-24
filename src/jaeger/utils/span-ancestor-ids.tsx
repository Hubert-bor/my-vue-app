
import _find from 'lodash/find';
import _get from 'lodash/get';

import { Span } from '../types/trace';

type TNil = null | undefined;

function getFirstAncestor(span: Span): Span | TNil {
  return _get(
    _find(
      span.references,
      ({ span: ref, refType }) =>
        ref &&
        ref.spanID &&
        ref.spanID !== span.spanID &&
        (refType === 'CHILD_OF' || refType === 'FOLLOWS_FROM')
    ),
    'span'
  );
}

export default function spanAncestorIds(span: Span | TNil): string[] {
  const ancestorIDs: string[] = [];
  if (!span) return ancestorIDs;
  let ref = getFirstAncestor(span);
  while (ref) {
    ancestorIDs.push(ref.spanID);
    ref = getFirstAncestor(ref);
  }
  return ancestorIDs;
}
