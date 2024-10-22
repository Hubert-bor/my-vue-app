import { defineComponent } from "vue";
import '../TimelineRow.css';

export default defineComponent({
  name: 'TimelineRowCell',
  props: {
    width: Number,
    className: String,
    style: String,
  },
  setup(props: any, { slots }) {
    const { children, className = '', width, style, ...rest } = props;
    const widthPercent = `${width * 100}%`;
    const mergedStyle = { ...style, flexBasis: widthPercent, maxWidth: widthPercent };
    return () => (
      <>
        <div class={`ub-relative ${className}`} style={mergedStyle} {...rest}>
          {slots.default?.()}
        </div>
      </>
    )
  },
})
