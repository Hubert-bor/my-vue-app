
import { Checkbox } from 'ant-design-vue';
// import { Link } from 'react-router-dom';
import TraceName from '../common/TraceName';
import { fetchedState } from '../constants';
import { formatDuration } from '../utils/date';
import { defineComponent } from 'vue';
import { FetchedState, TNil, ApiError } from '../types/trace';

import './ResultItemTitle.css';
// import { getTargetEmptyOrBlank } from '../../../utils/config/get-target';

type Props = {
  duration?: number;
  durationPercent?: number;
  error?: ApiError;
  isInDiffCohort: boolean;
  linkTo: any;
  state?: FetchedState | TNil;
  targetBlank?: boolean;
  toggleComparison: (traceID: string, isInDiffCohort: boolean) => void;
  traceID: string;
  traceName?: string;
  disableComparision?: boolean;
};

export default defineComponent({
  name: 'ResultItemTitle',
  props: [
    'disableComparision',
    'duration',
    'durationPercent',
    'error',
    'isInDiffCohort',
    'linkTo',
    'state',
    'targetBlank',
    'traceID',
    'traceName'
  ],
  setup(props: any) {
    const DEFAULT_DURATION_PERCENT = 0;
    const defaultProps = {
      disableComparision: false,
      durationPercent: DEFAULT_DURATION_PERCENT,
      error: undefined,
      state: undefined,
      targetBlank: false,
    };


    const stopCheckboxPropagation = (evt: any) => evt.stopPropagation();

    const {
      disableComparision,
      duration,
      durationPercent,
      error,
      isInDiffCohort,
      linkTo,
      state,
      targetBlank,
      traceID,
      traceName,
    } = props;
    // Use a div when the ResultItemTitle doesn't link to anything
    let WrapperComponent: string = 'div';
    const wrapperProps: Record<string, string> = {
      className: 'ResultItemTitle--item ub-flex-auto',
    };
    if (linkTo) {
      wrapperProps.to = linkTo;
      if (targetBlank) {
        // wrapperProps.target = getTargetEmptyOrBlank();
        wrapperProps.rel = 'noopener noreferrer';
      }
    }
    const isErred = state === fetchedState.ERROR;
    // Separate propagation management and toggle manegement due to ant-design#16400
    const checkboxProps = {
      className: 'ResultItemTitle--item ub-flex-none',
      checked: !isErred && isInDiffCohort,
      disabled: isErred,
      onChange: () => {
        console.log('change')
      },
      onClick: stopCheckboxPropagation,
    };
    return () => (
      <>
        <div className="ResultItemTitle">
          {/* TODO: Shouldn't need cast */}
          <WrapperComponent {...(wrapperProps as any)}>
            <span
              className="ResultItemTitle--durationBar"
              style={{ width: `${durationPercent || DEFAULT_DURATION_PERCENT}%` }}
            />
            {duration != null && <span className="ub-right ub-relative">{formatDuration(duration)}</span>}
            <h3 className="ResultItemTitle--title">
              <TraceName error={error} state={state} traceName={traceName} />
              <small className="ResultItemTitle--idExcerpt">{traceID.slice(0, 7)}</small>
            </h3>
          </WrapperComponent>
        </div>
      </>
    )
  }
})

