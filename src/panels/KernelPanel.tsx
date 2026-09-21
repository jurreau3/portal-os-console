import { PanelCard } from '../ui/PanelCard';
import { useSSE } from '../api/useSSE';
import type { KernelResponse } from '../api/types';

export function KernelPanel() {
  const { data, error, connected } = useSSE('/kernel');
  return <PanelCard title="Kernel" eyebrow="/kernel" actions={<span className={connected ? 'stream-status connected' : 'stream-status'}>{connected ? '● LIVE' : '○ OFFLINE'}</span>}>
    {error && <p className="error" role="alert">{error}</p>}
    <pre className="payload">{data ? JSON.stringify(data as KernelResponse, null, 2) : 'Waiting for kernel events…'}</pre>
  </PanelCard>;
}
