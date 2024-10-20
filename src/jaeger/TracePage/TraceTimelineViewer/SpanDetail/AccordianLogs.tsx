import _sortBy from 'lodash/sortBy';
// import { IoChevronDown, IoChevronForward } from 'react-icons/io5';

import AccordianKeyValues from './AccordianKeyValues';
import { formatDuration } from '../utils';

import './AccordianLogs.css';

type AccordianLogsProps = {
  interactive?: boolean;
  isOpen: boolean;
  linksGetter: ((pairs: any[], index: number) => any[]) | any;
  logs: any[];
  onItemToggle?: (log: any) => void;
  onToggle?: () => void;
  openedItems?: Set<any>;
  timestamp: number;
};

export default function AccordianLogs(props: AccordianLogsProps) {
  const { interactive, isOpen, linksGetter, logs, openedItems, onItemToggle, onToggle, timestamp } = props;
  let arrow: any = null;
  let HeaderComponent: 'span' | 'a' = 'span';
  let headerProps: object | null = null;
  if (interactive) {
    arrow = isOpen ? (
      <div>1</div>
      // <IoChevronDown className="u-align-icon" />
    ) : (
      <div>2</div>

      // <IoChevronForward className="u-align-icon" />
    );
    HeaderComponent = 'a';
    headerProps = {
      'aria-checked': isOpen,
      onClick: onToggle,
      role: 'switch',
    };
  }

  return (
    <div className="AccordianLogs">
      <HeaderComponent className={'AccordianLogs--header'}>
        {arrow} <strong>Logs</strong> ({logs.length})
      </HeaderComponent>
      {isOpen && (
        <div className="AccordianLogs--content">
          {_sortBy(logs, 'timestamp').map((log, i) => (
            <AccordianKeyValues
              // `i` is necessary in the key because timestamps can repeat
              // eslint-disable-next-line react/no-array-index-key
              key={`${log.timestamp}-${i}`}
              className={i < logs.length - 1 ? 'ub-mb1' : null}
              data={log.fields || []}
              highContrast
              interactive={interactive}
              isOpen={openedItems ? openedItems.has(log) : false}
              label={`${formatDuration(log.timestamp - timestamp)}`}
              linksGetter={linksGetter}
              onToggle={interactive && onItemToggle ? () => onItemToggle(log) : null}
            />
          ))}
          <small className="AccordianLogs--footer">
            Log timestamps are relative to the start time of the full trace.
          </small>
        </div>
      )}
    </div>
  );
}

AccordianLogs.defaultProps = {
  interactive: true,
  linksGetter: undefined,
  onItemToggle: undefined,
  onToggle: undefined,
  openedItems: undefined,
};
