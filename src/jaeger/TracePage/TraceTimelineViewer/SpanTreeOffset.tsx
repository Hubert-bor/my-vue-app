
import _get from 'lodash/get';
// import { IoChevronDown, IoChevronForward } from 'react-icons/io5';

import spanAncestorIds from '../../utils/span-ancestor-ids';

import './SpanTreeOffset.css';
import { defineComponent } from 'vue';

type TDispatchProps = {
  addHoverIndentGuideId: (spanID: string) => void;
  removeHoverIndentGuideId: (spanID: string) => void;
};

type TProps = TDispatchProps & {
  childrenVisible?: boolean;
  hoverIndentGuideIds: Set<string>;
  onClick?: () => void;
  span: any;
  showChildrenIcon?: boolean;
};


export default defineComponent({
  name: 'UnconnectedSpanTreeOffset',
  props: {
    childrenVisible: Boolean,
    hoverIndentGuideIds: Object,
    onClick: Function,
    span: Object,
    showChildrenIcon: Boolean,
    addHoverIndentGuideId: Function,
    removeHoverIndentGuideId: Function,
  },
  setup(props: any) {
    let ancestorIds: string[];
    const defaultProps = {
      childrenVisible: false,
      onClick: undefined,
      showChildrenIcon: true,
    };


    ancestorIds = spanAncestorIds(props.span);
    // Some traces have multiple root-level spans, this connects them all under one guideline and adds the
    // necessary padding for the collapse icon on root-level spans.
    ancestorIds.push('root');

    ancestorIds.reverse();

    /**
     * If the mouse leaves to anywhere except another span with the same ancestor id, this span's ancestor id is
     * removed from the set of hoverIndentGuideIds.
     *
     * @param {Object} event - React Synthetic event tied to mouseleave. Includes the related target which is
     *     the element the user is now hovering.
     * @param {string} ancestorId - The span id that the user was hovering over.
     */
    const handleMouseLeave = (event: any, ancestorId: string) => {
      if (
        !(event.relatedTarget instanceof HTMLSpanElement) ||
        _get(event, 'relatedTarget.dataset.ancestorId') !== ancestorId
      ) {
        props.removeHoverIndentGuideId(ancestorId);
      }
    };

    /**
     * If the mouse entered this span from anywhere except another span with the same ancestor id, this span's
     * ancestorId is added to the set of hoverIndentGuideIds.
     *
     * @param {Object} event - React Synthetic event tied to mouseenter. Includes the related target which is
     *     the last element the user was hovering.
     * @param {string} ancestorId - The span id that the user is now hovering over.
     */
    const handleMouseEnter = (event: any, ancestorId: string) => {
      if (
        !(event.relatedTarget instanceof HTMLSpanElement) ||
        _get(event, 'relatedTarget.dataset.ancestorId') !== ancestorId
      ) {
        props.addHoverIndentGuideId(ancestorId);
      }
    };

    const { childrenVisible, onClick, showChildrenIcon,
      span
    } = props;


    const { hasChildren, spanID } = span;
    const wrapperProps = hasChildren ? { onClick, role: 'switch', 'aria-checked': childrenVisible } : null;
    const icon =
      showChildrenIcon && hasChildren && (childrenVisible ? <div>IoChevronDown</div> : <div>IoChevronForward</div>);
    return () => (
      <>
        <span class={`SpanTreeOffset ${hasChildren ? 'is-parent' : ''}`} {...wrapperProps}>
          {ancestorIds.map(ancestorId => (
            <span
              key={ancestorId}
              class={
                {
                  'SpanTreeOffset--indentGuide': true,
                  'is-active': props.hoverIndentGuideIds?.has(ancestorId),
                }
              }
              data-ancestor-id={ancestorId}
              onMouseEnter={event => handleMouseEnter(event, ancestorId)}
              onMouseLeave={event => handleMouseLeave(event, ancestorId)}
            />
          ))}
          {icon && (
            <span
              class="SpanTreeOffset--iconWrapper"
              onMouseEnter={event => handleMouseEnter(event, spanID)}
              onMouseLeave={event => handleMouseLeave(event, spanID)}
            >
              {icon}
            </span>
          )}
        </span>
      </>
    )
  }
})

// export class UnconnectedSpanTreeOffset extends React.PureComponent<TProps> {

// }

// export function mapStateToProps(state: ReduxState): { hoverIndentGuideIds: Set<string> } {
//   const { hoverIndentGuideIds } = state.traceTimeline;
//   return { hoverIndentGuideIds };
// }

// export function mapDispatchToProps(dispatch: Dispatch<ReduxState>): TDispatchProps {
//   const { addHoverIndentGuideId, removeHoverIndentGuideId } = bindActionCreators(actions, dispatch);
//   return { addHoverIndentGuideId, removeHoverIndentGuideId };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedSpanTreeOffset);
