
import DRange from 'drange';

import convPlexus from '../../../model/trace-dag/convPlexus';
import TraceDag from '../../../model/trace-dag/TraceDag';
import TDagNode from '../../../model/trace-dag/types/TDagNode';

let parentChildOfMap: Record<string, any[]>;

export function isError(tags: Array<any>) {
  if (tags) {
    const errorTag = tags.find(t => t.key === 'error');
    if (errorTag) {
      return errorTag.value;
    }
  }

  return false;
}

function mapFollowsFrom(
  edges: any[],
  nodes: TDagNode<any & any>[]
): any {
  return edges.map(e => {
    let hasChildOf = true;
    if (typeof e.to === 'number') {
      const node = nodes[e.to];
      hasChildOf = node.members.some(
        m => m.span.references && m.span.references.some(r => r.refType === 'CHILD_OF')
      );
    }
    return { ...e, followsFrom: !hasChildOf };
  });
}

function getChildOfSpans(parentID: string, trace: any): any {
  if (!parentChildOfMap) {
    parentChildOfMap = {};
    trace.spans.forEach(s => {
      if (s.references) {
        // Filter for CHILD_OF we don't want to calculate FOLLOWS_FROM (prod-cons)
        const parentIDs = s.references.filter(r => r.refType === 'CHILD_OF').map(r => r.spanID);
        parentIDs.forEach((pID: string) => {
          parentChildOfMap[pID] = parentChildOfMap[pID] || [];
          parentChildOfMap[pID].push(s);
        });
      }
    });
  }
  return parentChildOfMap[parentID] || [];
}

function getChildOfDrange(parentID: string, trace: any) {
  const childrenDrange = new DRange();
  getChildOfSpans(parentID, trace).forEach(s => {
    // -1 otherwise it will take for each child a micro (incluse,exclusive)
    childrenDrange.add(s.startTime, s.startTime + (s.duration <= 0 ? 0 : s.duration - 1));
  });
  return childrenDrange;
}

export function calculateTraceDag(trace: any): TraceDag<any> {
  const baseDag = TraceDag.newFromTrace(trace);
  const dag = new TraceDag<any>();

  baseDag.nodesMap.forEach(node => {
    const ntime = node.members.reduce((p, m) => p + m.span.duration, 0);
    const numErrors = node.members.reduce((p, m) => p + (isError(m.span.tags) ? 1 : 0), 0);
    const childDurationsDRange = node.members.reduce((p, m) => {
      // Using DRange to handle overlapping spans (fork-join)
      const cdr = new DRange(m.span.startTime, m.span.startTime + m.span.duration).intersect(
        getChildOfDrange(m.span.spanID, trace)
      );
      return p + cdr.length;
    }, 0);
    const stime = ntime - childDurationsDRange;
    dag.addNode(node.id, node.parentID, {
      ...node,
      count: node.members.length,
      errors: numErrors,
      time: ntime,
      percent: (100 / trace.duration) * ntime,
      selfTime: stime,
      percentSelfTime: (100 / ntime) * stime,
    });
  });
  return dag;
}

export default function calculateTraceDagEV(trace: any): any {
  const traceDag = calculateTraceDag(trace);
  const nodes = [...traceDag.nodesMap.values()];
  const ev = convPlexus(traceDag.nodesMap);
  const edges = mapFollowsFrom(ev.edges, nodes);
  return { ...ev, edges };
}
