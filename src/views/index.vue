<template>
    <div class="q-pa-md q-gutter-sm">
      <q-btn color="primary" label="traces list" @click="router.push({path:'/traceList'})"></q-btn>
      <q-btn color="secondary" label="chart"></q-btn>
  </div>
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

