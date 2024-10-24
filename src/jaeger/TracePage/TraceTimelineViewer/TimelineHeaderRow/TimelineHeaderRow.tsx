// import * as React from 'react';

// import VerticalResizer from '../../../common/VerticalResizer';
import TimelineCollapser from './TimelineCollapser';
import TimelineViewingLayer from './TimelineViewingLayer';
import Ticks from '../Ticks';
import TimelineRow from './TimelineRow';
import TimelineRowCell from './TimelineRowCell';
import { TUpdateViewRangeTimeFunction, IViewRangeTime, ViewRangeTimeUpdate } from '../../types';

import './TimelineHeaderRow.css';
import { defineComponent } from 'vue';

type TimelineHeaderRowProps = {
  duration: number;
  nameColumnWidth: number;
  numTicks: number;
  onCollapseAll: () => void;
  onCollapseOne: () => void;
  onColummWidthChange: (width: number) => void;
  onExpandAll: () => void;
  onExpandOne: () => void;
  updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
  updateViewRangeTime: TUpdateViewRangeTimeFunction;
  viewRangeTime: IViewRangeTime;
};

export default defineComponent({
  name: 'TimelineHeaderRow',
  props: {
    duration: { type: Number },
    viewRangeTime: { type: Object },
    nameColumnWidth: { type: Number },
    numTicks: { type: Number },
    onCollapseAll: Function,
    onCollapseOne: Function,
    onColummWidthChange: Function,
    onExpandAll: Function,
    onExpandOne: Function,
    updateViewRangeTime: Object,
    updateNextViewRangeTime: Object,
  },
  components: {
    TimelineRow,
    TimelineRowCell,
    TimelineCollapser,
    TimelineViewingLayer,
    Ticks
  },
  setup(props: any, ctx) {
    const {
      duration,
      nameColumnWidth,
      numTicks,
      onCollapseAll,
      onCollapseOne,
      onColummWidthChange,
      onExpandAll,
      onExpandOne,
      updateViewRangeTime,
      updateNextViewRangeTime,
      viewRangeTime,
    } = props;

    const [viewStart, viewEnd] = viewRangeTime.current;

    return () => (
      <>
        <TimelineRow className="TimelineHeaderRow" v-slots={
          {
            default: () => (
              <>
                <TimelineRowCell className="ub-flex ub-px2" width={nameColumnWidth}>
                  <h3 class="TimelineHeaderRow--title">Service &amp; Operation</h3>
                  <TimelineCollapser
                    onCollapseAll={onCollapseAll}
                    onExpandAll={onExpandAll}
                    onCollapseOne={onCollapseOne}
                    onExpandOne={onExpandOne}
                  />
                </TimelineRowCell>
                <TimelineRowCell width={1 - nameColumnWidth} >
                  <TimelineViewingLayer
                    boundsInvalidator={nameColumnWidth}
                    updateNextViewRangeTime={updateNextViewRangeTime}
                    updateViewRangeTime={updateViewRangeTime}
                    viewRangeTime={viewRangeTime}
                  />
                  <Ticks numTicks={numTicks} startTime={viewStart * duration} endTime={viewEnd * duration} showLabels />
                </TimelineRowCell>
                {/* <VerticalResizer position={nameColumnWidth} onChange={onColummWidthChange} min={0.15} max={0.85} /> */}
              </>
            )
          }
        }>
        </TimelineRow >
      </>
    )
  },
})

