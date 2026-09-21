import { useState } from 'react';
import type { KernelCommandResponse } from '../api/types';
import { api } from '../api/client';
import { PanelCard } from '../ui/PanelCard';

export function KernelControlsPanel() {
  const [result, setResult] = useState<KernelCommandResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const run = async (command: () => Promise<KernelCommandResponse>) => {
    try {
      setBusy(true);
      setError(null);
      setResult(await command());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Request failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <PanelCard title="Kernel Controls">
      <div className="control-actions">
        <button type="button" disabled={busy} onClick={() => void run(api.kernelRestart)}>Restart Kernel</button>
        <button type="button" disabled={busy} onClick={() => void run(() => api.kernelSpawnProcess('worker'))}>Spawn Process</button>
        <button type="button" disabled={busy} onClick={() => void run(() => api.kernelKillProcess('123'))}>Kill PID 123</button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <pre className="payload">{result ? JSON.stringify(result, null, 2) : 'No command run.'}</pre>
    </PanelCard>
  );
}
