import { useCallback, useState } from 'react';
import { apiClient } from '../api/client';
import { useLive } from '../hooks/useLive';
import { PanelCard } from '../ui/PanelCard';
import { RefreshButton } from '../components/RefreshButton';
import type { ApiRoute } from '../api/types';

type PanelProps = { route: ApiRoute; title: string; interval?: number };

export function ApiPanel({ route, title, interval = 2000 }: PanelProps) {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await apiClient.get(route));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  }, [route]);

  useLive(() => void refresh(), interval);

  return (
    <PanelCard title={title} eyebrow={route} actions={<RefreshButton onClick={() => void refresh()} disabled={loading} />}>
      {error && <p className="error" role="alert">{error}</p>}
      <pre className="payload">{data ? JSON.stringify(data, null, 2) : loading ? 'Loading…' : 'No data loaded.'}</pre>
    </PanelCard>
  );
}
