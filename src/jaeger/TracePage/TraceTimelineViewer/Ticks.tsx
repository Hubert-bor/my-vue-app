
import { formatDuration } from './utils';
import './Ticks.css';

type TicksProps = {
  endTime?: number;
  numTicks: number;
  showLabels?: boolean;
  startTime?: number;
};

export default function Ticks(props: TicksProps) {
  const { endTime, numTicks, showLabels, startTime } = props;

  let labels: undefined | string[];
  if (showLabels) {
    labels = [];
    const viewingDuration = (endTime || 0) - (startTime || 0);
    for (let i = 0; i < numTicks; i++) {
      const durationAtTick = (startTime || 0) + (i / (numTicks - 1)) * viewingDuration;
      labels.push(formatDuration(durationAtTick));
    }
  }
  const ticks: any = [];
  for (let i = 0; i < numTicks; i++) {
    const portion = i / (numTicks - 1);
    ticks.push(
      <div
        key={portion}
        class="Ticks--tick"
        style={{
          left: `${portion * 100}%`,
        }}
      >
        {labels && (
          <span class={`Ticks--tickLabel ${portion >= 1 ? 'isEndAnchor' : ''}`}>{labels[i]}</span>
        )}
      </div>
    );
  }
  return (<div class="Ticks">{ticks}</div>);
}

Ticks.defaultProps = {
  endTime: null,
  showLabels: null,
  startTime: null,
};
