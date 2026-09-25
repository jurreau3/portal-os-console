import { useCallback, useState } from 'react';
import { api } from '../api/client';
import { useLive } from '../hooks/useLive';
import { PanelCard } from '../ui/PanelCard';
import { RefreshButton } from './RefreshButton';

export function StatePanel() {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    try { setData(await api.get('/state')); setError(null); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Request failed'); }
  }, []);
  useLive(() => void load());
  return <PanelCard title="State" eyebrow="/state" actions={<RefreshButton onClick={() => void load()} />}>
    {error && <p className="error" role="alert">{error}</p>}<pre className="payload">{data ? JSON.stringify(data, null, 2) : 'Loading…'}</pre>
  </PanelCard>;
}
