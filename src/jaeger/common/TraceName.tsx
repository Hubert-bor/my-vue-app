import BreakableText from './BreakableText';
import LoadingIndicator from './LoadingIndicator';
import { fetchedState, FALLBACK_TRACE_NAME } from '../constants';

import { FetchedState, TNil, ApiError } from '../types/trace';

import './TraceName.css';

type Props = {
  className?: string;
  error?: ApiError | TNil;
  state?: FetchedState | TNil;
  traceName?: string | TNil;
};

export default function TraceName(props: Props) {
  const { className, error, state, traceName } = props;

  const isErred = state === fetchedState.ERROR;

  let title: string = traceName || FALLBACK_TRACE_NAME;

  if (isErred) {
    let titleStr = '';
    if (error) {
      titleStr = typeof error === 'string' ? error : error.message || String(error);
    }
    if (!titleStr) {
      titleStr = 'Error: Unknown error';
    }

    title = <BreakableText text={titleStr} />;
  } else if (state === fetchedState.LOADING) {
    title = <LoadingIndicator small data-testid="loadingIndicator" />;
  } else {
    title = <BreakableText text={String(traceName || FALLBACK_TRACE_NAME)} />;
  }

  return (
    <span className={`TraceName ${isErred ? 'is-error' : ''} ${className || ''}`} data-testid="traceName">
      {title}
    </span>
  );
}
