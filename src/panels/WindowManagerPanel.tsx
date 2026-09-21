import { useEffect, useState } from 'react';
import type { WindowInfo } from '../api/types';
import { api } from '../api/client';
import { PanelCard } from '../ui/PanelCard';

export function WindowManagerPanel() {
  const [windows, setWindows] = useState<WindowInfo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    api.windowsList()
      .then((value) => { if (active) setWindows(value); })
      .catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : 'Request failed'); });
    return () => { active = false; };
  }, []);

  return (
    <PanelCard title="Window Manager">
      {error && <p className="error" role="alert">{error}</p>}
      {!windows && !error ? 'Loading…' : windows ? <pre className="payload">{JSON.stringify(windows, null, 2)}</pre> : 'No window data.'}
    </PanelCard>
  );
}
