import { PanelCard } from '../ui/PanelCard';
import { useSSE } from '../api/useSSE';
import type { IdentitySession } from '../api/types';

export function IdentitySessionInspectorPanel() {
  const { data, online } = useSSE<IdentitySession>('identity-session');
  return <PanelCard title={`Identity Session (Live: ${online ? 'Online' : 'Offline'})`}>
    {!data ? 'Waiting for identity events…' : <pre className="payload">{JSON.stringify(data, null, 2)}</pre>}
  </PanelCard>;
}
