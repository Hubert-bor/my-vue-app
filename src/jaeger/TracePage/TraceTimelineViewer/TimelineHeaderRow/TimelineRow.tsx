import { defineComponent } from "vue";
import '../TimelineRow.css';

export default defineComponent({
  name: 'TimelineRow',
  props: {
    children: Object,
    className: String,
  },
  setup(props: any, { slots }) {
    const { children, className = 'TimelineHeaderRow', ...rest } = props;
    return () => (
      <>
        <div class={`flex-row ${className}`} {...rest}>
          {slots.default?.()}
        </div>
      </>
    )

  },
})
