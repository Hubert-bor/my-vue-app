<template>
  <div v-for="(trace) in mockTraces" :key="trace.traceID" class="ub-my3">
    <ResultItem 
      :durationPercent="getPercentageOfDuration(trace.duration, 3600)"
      :isInDiffCohort="cohortIds.has(trace.traceID)"
      :trace="trace"
    />
  </div>
 
</template>


<script lang="ts" setup>
import { ref } from 'vue'

import ResultItem from './SearchTracePage/ResultItem'

import mockTraces from './mock/mockTraces'

const FETCH_DONE = 'FETCH_DONE';
const FETCH_ERROR = 'FETCH_ERROR';
const FETCH_LOADING = 'FETCH_LOADING';

const fetchedState = {
  DONE: FETCH_DONE,
  ERROR: FETCH_ERROR,
  LOADING: FETCH_LOADING,
};

const diffCohort = ref<any>([])
const cohortIds = new Set(diffCohort.value.map(datum => datum.id));

function getPercentageOfDuration(duration: number, totalDuration: number): number {
  return (duration / totalDuration) * 100;
}


const stateTraceXformer =(stateTrace) => {
  const { traces: traceMap, rawTraces, search } = stateTrace;
  const { query, results, state, error: traceError } = search;

  const loadingTraces = state === fetchedState.LOADING;
  const traces = results.map(id => traceMap[id].data);
  const maxDuration = Math.max.apply(
    null,
    traces.map(tr => tr.duration)
  );
  return { traces, rawTraces, maxDuration, traceError, loadingTraces, query };
}
</script>

