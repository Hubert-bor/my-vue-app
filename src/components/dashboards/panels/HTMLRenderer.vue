<template>
  <div class="scroll" style="width: 100%; height: 100%; overflow: auto">
    <div
      v-html="DOMPurify.sanitize(htmlContent)"
      data-test="html-renderer"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DOMPurify from "dompurify";

export default defineComponent({
  name: "HTMLRenderer",
  props: {
    htmlContent: {
      type: String,
      default: "",
    },
  },
  setup(): any {
    return {
      DOMPurify,
    };
  },
});
</script>
