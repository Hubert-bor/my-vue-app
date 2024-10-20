
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
    <ul className={`LabeledList ${className || ''}`}>
      {items.map(({ key, label, value }, i) => {
        const divider = i < items.length - 1 && (
          <li className="LabeledList--item" key={`${key}--divider`}>
            <Divider className={dividerClassName} type="vertical" />
          </li>
        );
        return [
          <li className="LabeledList--item" key={key}>
            <span className="LabeledList--label">{label}</span>
            <strong>{value}</strong>
          </li>,
          divider,
        ];
      })}
    </ul>
  );
}
