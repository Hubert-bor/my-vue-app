

import CanvasSpanGraph from './CanvasSpanGraph';
import TickLabels from './TickLabels';
import ViewingLayer from './ViewingLayer';
import { TUpdateViewRangeTimeFunction, IViewRange, ViewRangeTimeUpdate } from '../../types';
import { defineComponent } from 'vue';

const DEFAULT_HEIGHT = 60;
const TIMELINE_TICK_INTERVAL = 4;

type SpanGraphProps = {
  height?: number;
  trace: any;
  viewRange: IViewRange;
  updateViewRangeTime: TUpdateViewRangeTimeFunction;
  updateNextViewRangeTime: (nextUpdate: ViewRangeTimeUpdate) => void;
};

type SpanItem = {
  valueOffset: number;
  valueWidth: number;
  serviceName: string;
};

function getItem(span: any): SpanItem {
  return {
    valueOffset: span.relativeStartTime,
    valueWidth: span.duration,
    serviceName: span.process.serviceName,
  };
}

function getItems(trace: any): SpanItem[] {
  return trace.spans.map(getItem);
}

const memoizedGetItems = getItems;

export default defineComponent({
name: 'SpanGraph',
  setup(props: any) {
    const height = 60

    const { trace, viewRange, updateNextViewRangeTime, updateViewRangeTime } = props;
    if (!trace) {
      return <div />;
    }

    const items = memoizedGetItems(trace);

    return () => (
      <>
        <div className="ub-pb2 ub-px2">
          <TickLabels numTicks={TIMELINE_TICK_INTERVAL} duration={trace.duration} />
          <div className="ub-relative">
            <CanvasSpanGraph valueWidth={trace.duration} items={items} />
            <ViewingLayer
              viewRange={viewRange}
              numTicks={TIMELINE_TICK_INTERVAL}
              height={height || DEFAULT_HEIGHT}
              updateViewRangeTime={updateViewRangeTime}
              updateNextViewRangeTime={updateNextViewRangeTime}
            />
          </div>
        </div>
      </>
    )
  }
})

