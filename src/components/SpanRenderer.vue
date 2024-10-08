<template>
  <div class="relative-position q-pt-sm" :style="{ height: '100%' }">
    <template v-if="spans?.length">
      <template v-for="span in spans as any[]" :key="span.spanId"> </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SpanBlock from "./SpanBlock.vue";

export default defineComponent({
  name: "SpanRenderer",
  props: {
    spans: {
      type: Array,
      default: () => [],
    },
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    collapseMapping: {
      type: Object,
      default: () => {},
    },
    baseTracePosition: {
      type: Object,
      default: () => null,
    },
    depth: {
      type: Number,
      default: 0,
    },
    spanDimensions: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["toggleCollapse"],
  setup(props, { emit }) {
    function toggleSpanCollapse(spanId: number | string) {
      emit("toggleCollapse", spanId);
    }

    return {
      toggleSpanCollapse,
    };
  },
  components: { SpanBlock },
});
</script>

<style scoped lang="scss">
.spans-container {
  position: relative;
}
</style>
