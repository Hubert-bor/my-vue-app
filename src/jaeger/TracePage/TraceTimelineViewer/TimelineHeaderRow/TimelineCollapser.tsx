
import { Tooltip } from 'ant-design-vue';
// import { LuChevronsRight } from 'react-icons/lu';
// import { IoChevronForward } from 'react-icons/io5';

import './TimelineCollapser.css';
import { defineComponent, ref } from 'vue';

type CollapserProps = {
  onCollapseAll: () => void;
  onCollapseOne: () => void;
  onExpandOne: () => void;
  onExpandAll: () => void;
};

function getTitle(value: string) {
  return <span className="TimelineCollapser--tooltipTitle">{value}</span>;
}


export default defineComponent({
  name: "TimelineCollapser",
  setup(props: any) {

    const containerRef = ref()

    // TODO: Something less hacky than createElement to help TypeScript / AntD
    const getContainer = () => containerRef.value || document.createElement('div');
    const { onExpandAll, onExpandOne, onCollapseAll, onCollapseOne } = props;


    return () => (
      <>
        <div className="TimelineCollapser" ref={containerRef}>
          <Tooltip title={getTitle('Expand +1')} getPopupContainer={getContainer}>
            <div
              onClick={onExpandOne}
              className="TimelineCollapser--btn-expand TimelineCollapser--btn-size TimelineCollapser--btn-down"
            >1
            </div>
          </Tooltip>
          <Tooltip title={getTitle('Collapse +1')} getPopupContainer={getContainer}>
            <div
              onClick={onCollapseOne}
              className="TimelineCollapser--btn TimelineCollapser--btn-size"
            >2</div>
          </Tooltip>
          <Tooltip title={getTitle('Expand All')} getPopupContainer={getContainer}>
            <div
              onClick={onExpandAll}
              className="TimelineCollapser--btn-expand TimelineCollapser--btn-size TimelineCollapser--btn-down"
            >3</div>
          </Tooltip>
          <Tooltip title={getTitle('Collapse All')} getPopupContainer={getContainer}>
            <div
              onClick={onCollapseAll}
              className="TimelineCollapser--btn TimelineCollapser--btn-size"
            >4</div>
          </Tooltip>
        </div>
      </>
    )

  }
})

