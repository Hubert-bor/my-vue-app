
// import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import TextList from './TextList';

import './AccordianText.css';

type AccordianTextProps = {
  className?: string;
  data: string[];
  headerClassName?: string;
  highContrast?: boolean;
  interactive?: boolean;
  isOpen: boolean;
  label: any;
  onToggle?: null | (() => void);
};

export default function AccordianText(props: AccordianTextProps) {
  const { className, data, headerClassName, highContrast, interactive, isOpen, label, onToggle } = props;
  const isEmpty = !Array.isArray(data) || !data.length;
  // const iconCls = cx('u-align-icon', { 'AccordianKeyValues--emptyIcon': isEmpty });
  const iconCls = 'u-align-icon'

  let arrow: any = null;
  let headerProps: object | null = null;

  if (interactive) {
    // arrow = isOpen ? <IoChevronDown className={iconCls} /> : <IoChevronForward className={iconCls} />;
    headerProps = {
      'aria-checked': isOpen,
      onClick: isEmpty ? null : onToggle,
      role: 'switch',
    };
  }

  return (
    <div className={className || ''}>
      <div
        className={{
          'is-empty': isEmpty,
          'is-high-contrast': highContrast,
          'is-open': isOpen,
        }}
        {...headerProps}
      >
        {arrow} <strong>{label}</strong> ({data.length})
      </div>
      {isOpen && <TextList data={data} />}
    </div>
  );
}

AccordianText.defaultProps = {
  className: null,
  highContrast: false,
  interactive: true,
  onToggle: null,
};
