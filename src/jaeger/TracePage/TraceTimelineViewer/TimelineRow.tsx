
import './TimelineRow.css';

type TTimelineRowProps = {
  children: any;
  className?: string;
};

interface ITimelineRowCellProps {
  children: any;
  className?: string;
  width: number;
  style?: object;
}

export default function TimelineRow(props: TTimelineRowProps) {
  const { children, className = '', ...rest } = props;
  return (
    <div className={`flex-row ${className}`} {...rest}>
      {children}
    </div>
  );
}

TimelineRow.defaultProps = {
  className: '',
};

function TimelineRowCell(props: ITimelineRowCellProps) {
  const { children, className = '', width, style, ...rest } = props;
  const widthPercent = `${width * 100}%`;
  const mergedStyle = { ...style, flexBasis: widthPercent, maxWidth: widthPercent };
  return (
    <div className={`ub-relative ${className}`} style={mergedStyle} {...rest}>
      {children}
    </div>
  );
}

TimelineRowCell.defaultProps = { className: '', style: {} };

TimelineRow.Cell = TimelineRowCell;
