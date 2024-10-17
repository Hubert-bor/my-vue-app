import { Col, Divider, Row, Tag } from 'ant-design-vue';
// import { Link } from 'react-router-dom';

import _sortBy from 'lodash/sortBy';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// import { IoAlert } from 'react-icons/io5';
import { ExclamationOutlined } from '@ant-design/icons-vue';

// import { trackConversions, EAltViewActions } from './index.track';
import * as markers from './ResultItem.markers';
import ResultItemTitle from './ResultItemTitle';
import colorGenerator from '../utils/colorGenerator';
import { formatRelativeDate } from '../utils/date';

import { KeyValuePair, Trace } from '../types/trace';

import './ResultItem.css';
import { defineComponent } from 'vue';

dayjs.extend(relativeTime);


type Props = {
  durationPercent: number;
  isInDiffCohort: boolean;
  linkTo: any;
  toggleComparison: (traceID: string) => void;
  trace: Trace;
  disableComparision: boolean;
};

type State = {
  erroredServices: Set<string>;
  numSpans: number;
  numErredSpans: number;
  timeStr: string;
  fromNow: string | boolean;
};

export default defineComponent({
  name: 'ResultItem',
  props: ['trace'],
  components: { Col, Divider, Row, Tag, ResultItemTitle, ExclamationOutlined },
  setup(props: Props) {
    console.log('%c ~ props ~ ', 'color:#2ecc71', props)

    const isErrorTag = ({ key, value }: KeyValuePair<boolean | string>) =>
      key === 'error' && (value === true || value === 'true');
    // const trackTraceConversions = () => trackConversions(EAltViewActions.Traces);
    const trackTraceConversions = () => { };

    const { startTime, spans } = props.trace;


    const startTimeDayjs = dayjs(startTime / 1000);

    const erroredServices: Set<string> = new Set<string>();

    const numErredSpans = spans.filter(sp => {
      const hasError = sp.tags.some(isErrorTag);
      if (hasError) {
        erroredServices.add(sp.process.serviceName);
      }
      return hasError;
    }).length;

    const state: State = {
      numSpans: spans.length,
      timeStr: startTimeDayjs.format('h:mm:ss a'),
      fromNow: startTimeDayjs.fromNow(),
      numErredSpans,
      erroredServices,
    };

    const { disableComparision, durationPercent, isInDiffCohort, linkTo, toggleComparison, trace } = props;
    const { duration, services, traceName, traceID } = trace;
    return () => (
      <>
        <div className="ResultItem" onClick={trackTraceConversions} role="button">
          <ResultItemTitle
            duration={duration}
            durationPercent={durationPercent}
            isInDiffCohort={isInDiffCohort}
            linkTo={linkTo}
            toggleComparison={toggleComparison}
            traceID={traceID}
            traceName={traceName}
            disableComparision={disableComparision}
          />
          <div>
            <Row>
              <Col span={4} style={{ padding: '6px' }}>
                <div className="ub-m1">
                  <Tag data-test={markers.NUM_SPANS}>
                    {state.numSpans} Span{state.numSpans > 1 && 's'}
                  </Tag>
                </div>
                {Boolean(state.numErredSpans) && (
                  <div className="ub-m1">
                    <Tag color="red">
                      {state.numErredSpans} Error{state.numErredSpans > 1 && 's'}
                    </Tag>
                  </div>
                )}
              </Col>
              <Col span={16} style={{ padding: '6px' }}>
                <ul className="ub-list-reset" data-test={markers.SERVICE_TAGS}>
                  {_sortBy(services, s => s.name).map(service => {
                    const { name, numberOfSpans: count } = service;
                    return (
                      <li key={name} className="ub-inline-block ub-m1">
                        <Tag
                          className="ResultItem--serviceTag"
                          style={{ borderLeftColor: colorGenerator.getColorByKey(name) }}
                        >
                          {state.erroredServices.has(name) && (
                            // @ts-ignore 
                            <ExclamationOutlined className="ResultItem--errorIcon" />
                          )}
                          {name} ({count})
                        </Tag>
                      </li>
                    );
                  })}
                </ul>
              </Col>
              <Col span={4}>
                <div className="ub-p2 ub-tx-right-align">
                  {formatRelativeDate(startTime / 1000)}
                  <Divider type="vertical" />
                  {state.timeStr.slice(0, -3)}&nbsp;{state.timeStr.slice(-2)}
                  <br />
                  <small>{state.fromNow}</small>
                </div>
              </Col>

            </Row>
          </div>
        </div>
      </>
    )
  }
})
