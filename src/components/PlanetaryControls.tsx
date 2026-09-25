import { useState } from 'react';
import { api } from '../api/client';
import { PanelCard } from '../ui/PanelCard';

export function PlanetaryControls() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const toggle = async () => {
    setBusy(true);
    setMessage(null);
    try {
      const result = await api.planetaryToggle();
      setMessage(result.message ?? 'Planetary mode toggled.');
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : 'Toggle request failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <PanelCard title="Planetary Controls" eyebrow="/planetary/toggle">
      <button type="button" className="primary-action" onClick={() => void toggle()} disabled={busy}>
        {busy ? 'Toggling…' : 'Toggle Planetary Mode'}
      </button>
      {message && <p className="poll-status" role="status">{message}</p>}
    </PanelCard>
  );
}
