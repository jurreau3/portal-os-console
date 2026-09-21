import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import type { LogsResponse } from '../api/types';

const POLL_INTERVAL_MS = 5000;

export function LogsPanel() {
  const [data, setData] = useState<LogsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      setData(await apiClient.bridge());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(), POLL_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [refresh]);

  return (
    <section className="panel" aria-labelledby="bridge-heading">
      <div className="panel-heading">
        <div><span className="eyebrow">/bridge</span><h2 id="bridge-heading">Logs</h2></div>
        <button type="button" onClick={() => void refresh()} disabled={loading}>{loading ? 'Loading…' : 'Refresh'}</button>
      </div>
      <p className="poll-status">Live updates every 5 seconds</p>
      {error && <p className="error" role="alert">{error}</p>}
      <pre className="payload">{data ? JSON.stringify(data, null, 2) : loading ? 'Loading…' : 'No data loaded.'}</pre>
    </section>
  );
}
