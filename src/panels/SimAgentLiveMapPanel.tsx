// src/panels/SimAgentLiveMapPanel.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { SimAgentLive } from '../api/types';

export function SimAgentLiveMapPanel() {
  const [agents, setAgents] = useState<SimAgentLive[]>([]);

  useEffect(() => {
    api.simLive().then(setAgents).catch(console.error);
  }, []);

  if (!agents.length) return <div>No live agents.</div>;

  return (
    <div className="panel sim-live-map">
      <h2>SIM Live Agents</h2>
      <ul>
        {agents.map(a => (
          <li key={a.id}>
            {a.id} — state: {a.state} — ({a.x}, {a.y})
          </li>
        ))}
      </ul>
    </div>
  );
}
