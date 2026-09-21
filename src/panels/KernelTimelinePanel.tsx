import { PanelCard } from '../ui/PanelCard';
import { useSSE } from '../api/useSSE';
import type { KernelEvent } from '../api/types';

export function KernelTimelinePanel() {
  const { data, online } = useSSE<KernelEvent[]>('kernel-timeline');
  return <PanelCard title={`Kernel Timeline (Live: ${online ? 'Online' : 'Offline'})`}>
    {!data ? 'Waiting for kernel events…' : <pre className="payload">{JSON.stringify(data, null, 2)}</pre>}
  </PanelCard>;
}
