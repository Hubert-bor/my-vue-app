<template>
    <div class="q-pa-md q-gutter-sm">
      <q-btn color="primary" label="traces list" to="/traceList"></q-btn>
      <q-btn color="secondary" label="chart" to="/traceDetails"></q-btn>
  </div>
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

