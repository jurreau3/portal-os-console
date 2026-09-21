import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import type { ApiRecord, ApiRoute } from '../api/types';

type PanelProps = { route: ApiRoute; title: string };

export function ApiPanel({ route, title }: PanelProps) {
  const [data, setData] = useState<ApiRecord | null>(null);
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

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <section className="panel" aria-labelledby={`${route.slice(1)}-heading`}>
      <div className="panel-heading">
        <div><span className="eyebrow">{route}</span><h2 id={`${route.slice(1)}-heading`}>{title}</h2></div>
        <button type="button" onClick={() => void refresh()} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <pre className="payload">{data ? JSON.stringify(data, null, 2) : loading ? 'Loading…' : 'No data loaded.'}</pre>
    </section>
  );
}
