
import { Divider } from 'ant-design-vue';

import './LabeledList.css';

type LabeledListProps = {
  className?: string;
  dividerClassName?: string;
  items: { key: string; label: any; value: any }[];
};

export default function LabeledList(props: LabeledListProps) {
  const { className, dividerClassName, items } = props;
  return (
    <ul class={`LabeledList ${className || ''}`}>
      {items.map(({ key, label, value }, i) => {
        const divider = i < items.length - 1 && (
          <li class="LabeledList--item" key={`${key}--divider`}>
            <Divider class={dividerClassName} type="vertical" />
          </li>
        );
        return [
          <li class="LabeledList--item" key={key}>
            <span class="LabeledList--label">{label}</span>
            <strong>{value}</strong>
          </li>,
          divider,
        ];
      })}
    </ul>
  );
}
