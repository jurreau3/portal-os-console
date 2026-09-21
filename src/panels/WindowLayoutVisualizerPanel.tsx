import { PanelCard } from '../ui/PanelCard';
import { useSSE } from '../api/useSSE';
import type { WindowLayout } from '../api/types';

export function WindowLayoutVisualizerPanel() {
  const { data, online } = useSSE<WindowLayout[]>('windows-layout');
  return <PanelCard title={`Window Layout (Live: ${online ? 'Online' : 'Offline'})`}>
    {!data ? 'Waiting for layout events…' : <pre className="payload">{JSON.stringify(data, null, 2)}</pre>}
  </PanelCard>;
}
