import { useCallback, useState } from 'react';
import { apiClient, type ApiResponse, type ApiRoute } from './api/client';
import './styles.css';

type PanelProps = { route: ApiRoute; title: string };

function Panel({ route, title }: PanelProps) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <section className="panel" aria-labelledby={`${route.slice(1)}-heading`}>
      <div className="panel-heading">
        <div>
          <span className="eyebrow">{route}</span>
          <h2 id={`${route.slice(1)}-heading`}>{title}</h2>
        </div>
        <button type="button" onClick={refresh} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <pre className="payload">{data ? JSON.stringify(data, null, 2) : 'No data loaded.'}</pre>
    </section>
  );
}

export function App() {
  return (
    <main className="shell">
      <header className="hero">
        <div>
          <p className="eyebrow">PORTAL-OS / CONSOLE</p>
          <h1>System surface</h1>
          <p className="subtitle">A focused view into identity, runtime state, and kernel signals.</p>
        </div>
        <div className="status"><span className="status-dot" /> GUI ONLINE</div>
      </header>
      <div className="panel-grid">
        <Panel route="/identity" title="Identity" />
        <Panel route="/umbrella" title="Umbrella" />
        <Panel route="/sim" title="SIM" />
        <Panel route="/kernel" title="Kernel" />
        <Panel route="/windows" title="Windows" />
        <Panel route="/autonomy" title="Logs & Autonomy" />
      </div>
    </main>
  );
}
