import { PanelCard } from '../ui/PanelCard';
import { useSSE } from '../api/useSSE';
import type { SimAgentLive } from '../api/types';

export function SimAgentLiveMapPanel() {
  const { data, online } = useSSE<SimAgentLive[]>('sim-agents');
  return <PanelCard title={`SIM Agents (Live: ${online ? 'Online' : 'Offline'})`}>
    {!data ? 'Waiting for agent events…' : <pre className="payload">{JSON.stringify(data, null, 2)}</pre>}
  </PanelCard>;
}
