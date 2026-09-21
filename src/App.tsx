import { useCallback, useEffect, useState } from 'react';
import { apiClient, type ApiResponse, type ApiRoute } from './api/client';
import './styles.css';

type PanelProps = { route: ApiRoute; title: string };

function ApiPanel({ route, title }: PanelProps) {
  const [data, setData] = useState<ApiResponse | null>(null);
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
        <div>
          <span className="eyebrow">{route}</span>
          <h2 id={`${route.slice(1)}-heading`}>{title}</h2>
        </div>
        <button type="button" onClick={() => void refresh()} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <pre className="payload">
        {data ? JSON.stringify(data, null, 2) : loading ? 'Loading…' : 'No data loaded.'}
      </pre>
    </section>
  );
}

export function IdentityPanel() {
  return <ApiPanel route="/identity" title="Identity" />;
}

export function UmbrellaPanel() {
  return <ApiPanel route="/umbrella" title="Umbrella" />;
}

export function SimPanel() {
  return <ApiPanel route="/sim" title="SIM" />;
}

export function KernelPanel() {
  return <ApiPanel route="/kernel" title="Kernel" />;
}

export function WindowsPanel() {
  return <ApiPanel route="/windows" title="Windows" />;
}

export function LogsPanel() {
  return <ApiPanel route="/bridge" title="Logs" />;
}

export default function App() {
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
        <IdentityPanel />
        <UmbrellaPanel />
        <SimPanel />
        <KernelPanel />
        <WindowsPanel />
        <LogsPanel />
      </div>
    </main>
  );
}
