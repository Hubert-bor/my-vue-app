import { Button, Input, Tooltip } from 'ant-design-vue';
// import { IoLocate, IoHelp, IoClose, IoChevronDown, IoChevronUp } from 'react-icons/io5';

import * as markers from './TracePageSearchBar.markers';
import { trackFilter } from '../index.track';
import UiFindInput from '../../common/UiFindInput';
import './TracePageSearchBar.css';
import { defineComponent } from 'vue';

type TracePageSearchBarProps = {
  textFilter: string;
  prevResult: () => void;
  nextResult: () => void;
  clearSearch: () => void;
  focusUiFindMatches: () => void;
  resultCount: number;
  navigable: boolean;
};

export function TracePageSearchBarFn(props: TracePageSearchBarProps & { forwardedRef: any }) {
  const {
    clearSearch,
    focusUiFindMatches,
    forwardedRef,
    navigable,
    nextResult,
    prevResult,
    resultCount,
    textFilter,
  } = props;

  const count = textFilter ? <span className="TracePageSearchBar--count">{resultCount}</span> : null;

  const btnClass = 'TracePageSearchBar--btn'
  const uiFindInputInputProps = {
    'data-test': markers.IN_TRACE_SEARCH,
    className: 'TracePageSearchBar--bar ub-flex-auto',
    name: 'search',
    suffix: count,
  };

  const renderTooltip = () => {
    return (
      <div style={{ wordBreak: 'normal' }}>
        <p>
          This is an in-page search. Enter the query as a list of space-separated string terms. Each term is
          used in a substring match against any of the following data elements: service name, operation name,
          span ID, and key-value pairs in tags and logs. The spans that match any of the search terms will be
          highlighted.
        </p>
        <p>
          For exact phrase search surround the query in double quotes like{' '}
          <code>&quot;The quick brown fox&quot;</code>
        </p>
        <p>
          When matching key-value pairs, the substring search is applied separately against the key, the
          value, and the concatenated <code>&quot;key=value&quot;</code> string. The latter allows searching
          for exact matches like <code>http.status_code=200</code>.
        </p>
        <p>
          To preclude certain key-value pairs from participating in the matching, prefix the key with the
          minus <code>&apos;-&apos;</code> sign, e.g., <code>-http.status_code</code>.
        </p>
      </div>
    );
  };

  return (
    <div className="TracePageSearchBar">
      {/* style inline because compact overwrites the display */}
      <Input.Group className="ub-justify-end" compact style={{ display: 'flex' }}>
        <UiFindInput
          inputProps={uiFindInputInputProps}
          forwardedRef={forwardedRef}
          trackFindFunction={trackFilter}
        />
        <Tooltip
          arrowPointAtCenter
          placement="bottomLeft"
          trigger="hover"
          overlayStyle={{ maxWidth: '600px' }} // This is a large tooltip and the default is too narrow.
          title={renderTooltip()}
        >
          <div className="help-btn-container">1
            {/* <IoHelp className="help-button" /> */}
          </div>
        </Tooltip>
        {navigable && (
          <>
            <Button
              className={'TracePageSearchBar--locateBtn'}
              disabled={!textFilter}
              htmlType="button"
              onClick={focusUiFindMatches}
            >2
              {/* <IoLocate /> */}
            </Button>
            <Button
              className={'TracePageSearchBar--ButtonUp'}
              disabled={!textFilter}
              htmlType="button"
              data-testid="UpOutlined"
              onClick={prevResult}
            >3
              {/* <IoChevronUp /> */}
            </Button>
            <Button
              className={'TracePageSearchBar--ButtonDown'}
              disabled={!textFilter}
              htmlType="button"
              data-testid="DownOutlined"
              onClick={nextResult}
            >4
              {/* <IoChevronDown /> */}
            </Button>
          </>
        )}
        <Button
          className={'TracePageSearchBar--ButtonClose'}
          disabled={!textFilter}
          htmlType="button"
          data-testid="CloseOutlined"
          onClick={clearSearch}
        >5
          {/* <IoClose /> */}
        </Button>
      </Input.Group>
    </div>
  );
}

export default defineComponent({
  name: 'TracePageSearchBarFn',
  setup(props, { attrs }) {
    return () => <TracePageSearchBarFn {...props} />
  },
})

// export default React.forwardRef((props: TracePageSearchBarProps, ref: React.Ref<InputRef>) => (
//   <TracePageSearchBarFn {...props} forwardedRef={ref} />
// ));
