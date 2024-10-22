import { Input } from 'ant-design-vue';
import _debounce from 'lodash/debounce';
import _isString from 'lodash/isString';

import updateUiFind from '../utils/update-ui-find';
import { defineComponent } from 'vue';

type TOwnProps = {
  allowClear?: boolean;
  forwardedRef?: any;
  inputProps: Record<string, any>;
  history: any;
  location: Location;
  match: any;
  trackFindFunction?: (str: string) => void;
};

export type TExtractUiFindFromStateReturn = {
  uiFind: string | undefined;
};

type TProps = TOwnProps & TExtractUiFindFromStateReturn;

type StateType = {
  ownInputValue: string | undefined;
};


export default defineComponent({
  name: 'UnconnectedUiFindInput',

  setup(props: any) {

    let defaultProps: Partial<TProps> = {
      forwardedRef: undefined,
      inputProps: {},
      trackFindFunction: undefined,
      uiFind: undefined,
    };

    let state = {
      ownInputValue: undefined,
    };

    const updateUiFindQueryParam = _debounce((uiFind?: string) => {
      const { history, location, uiFind: prevUiFind, trackFindFunction } = props;
      if (uiFind === prevUiFind || (!prevUiFind && !uiFind)) return;
      updateUiFind({
        location,
        history,
        trackFindFunction,
        uiFind,
      });
    }, 250);

    const clearUiFind = () => {
      updateUiFindQueryParam();
      updateUiFindQueryParam.flush();
    };

    const handleInputBlur = () => {
      updateUiFindQueryParam.flush();
      // setState({ ownInputValue: undefined });
    };

    const handleInputChange = (evt: any) => {
      const { value } = evt.target;
      updateUiFindQueryParam(value);
      // setState({ ownInputValue: value });
    };

    const { allowClear, forwardedRef, inputProps } = props;

    const inputValue = _isString(state.ownInputValue) ? state.ownInputValue : props.uiFind;
    const suffix = (
      <>
        {allowClear && inputValue && inputValue.length && <div onClick={clearUiFind} >222</div>}
        {inputProps?.suffix}
      </>
    );

    return () => (
      <>
        <Input
          placeholder="Find..."
          {...inputProps}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          ref={forwardedRef}
          suffix={suffix}
          value={inputValue}
        />
      </>
    )

  }
})

// export class UnconnectedUiFindInput extends React.PureComponent<TProps, StateType> {

// }

export function extractUiFindFromState(state: any): TExtractUiFindFromStateReturn {
  // const { uiFind: uiFindFromUrl } = parseQuery(state.router.location.search);
  // const uiFind = Array.isArray(uiFindFromUrl) ? uiFindFromUrl.join(' ') : uiFindFromUrl;
  return { uiFind: '' };
}

// export default connect(extractUiFindFromState)(withRouteProps(UnconnectedUiFindInput)) as any;
