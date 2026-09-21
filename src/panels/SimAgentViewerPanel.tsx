import { useEffect, useState } from 'react';
import type { SimAgent } from '../api/types';
import { api } from '../api/client';
import { PanelCard } from '../ui/PanelCard';

export function SimAgentViewerPanel() {
  const [agents, setAgents] = useState<SimAgent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    api.simAgents()
      .then((value) => { if (active) setAgents(value); })
      .catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : 'Request failed'); });
    return () => { active = false; };
  }, []);

  return (
    <PanelCard title="SIM Agents">
      {error && <p className="error" role="alert">{error}</p>}
      {!agents && !error ? 'Loading…' : agents ? <pre className="payload">{JSON.stringify(agents, null, 2)}</pre> : 'No agent data.'}
    </PanelCard>
  );
}
