import { useCallback, useState } from 'react';
import { api } from '../api/client';
import type { KernelResponse } from '../api/types';
import { useLive } from '../hooks/useLive';
import { PanelCard } from '../ui/PanelCard';
import { RefreshButton } from '../components/RefreshButton';

export function KernelPanel() {
  const [kernel, setKernel] = useState<KernelResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setKernel(await api.kernel());
      setError(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useLive(() => void load(), 3000);

  return (
    <PanelCard title="Kernel" eyebrow="/kernel" actions={<RefreshButton onClick={() => void load()} disabled={loading} />}>
      {error && <p className="error" role="alert">{error}</p>}
      <pre className="payload">{kernel ? JSON.stringify(kernel, null, 2) : loading ? 'Loading…' : 'No data loaded.'}</pre>
    </PanelCard>
  );
}
