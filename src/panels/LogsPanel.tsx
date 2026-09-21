import { PanelCard } from '../ui/PanelCard';
import { useSSE } from '../api/useSSE';

export function LogsPanel() {
  const { data, error, connected } = useSSE('/bridge');
  return <PanelCard title="Logs" eyebrow="/bridge" actions={<span className={connected ? 'stream-status connected' : 'stream-status'}>{connected ? '● LIVE' : '○ OFFLINE'}</span>}>
    <p className="poll-status">Server-sent events stream</p>
    {error && <p className="error" role="alert">{error}</p>}
    <pre className="payload">{data ? JSON.stringify(data, null, 2) : 'Waiting for log events…'}</pre>
  </PanelCard>;
}
