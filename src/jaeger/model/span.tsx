
/**
 * Searches the span.references to find 'CHILD_OF' reference type or returns null.
 * @param  {Span} span The span whose parent is to be returned.
 * @return {Span|null} The parent span if there is one, null otherwise.
 */
// eslint-disable-next-line import/prefer-default-export
export function getParent(span: any) {
  const parentRef = span.references ? span.references.find(ref => ref.refType === 'CHILD_OF') : null;
  return parentRef ? parentRef.span : null;
}
