<template>
  <div
    class="scroll"
    style="width: 100%; height: 100%; overflow: auto; padding: 1%"
  >
    <div
      v-html="DOMPurify.sanitize(marked(markdownContent))"
      data-test="markdown-renderer"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DOMPurify from "dompurify";
import { marked } from "marked";

export default defineComponent({
  name: "MarkdownRenderer",
  props: {
    markdownContent: {
      type: String,
      default: "",
    },
  },
  setup(): any {
    return {
      DOMPurify,
      marked,
    };
  },
});
</script>
