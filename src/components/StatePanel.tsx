// src/components/StatePanel.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { StateSnapshot } from '../api/types';

export function StatePanel() {
  const [snapshot, setSnapshot] = useState<StateSnapshot | null>(null);

  useEffect(() => {
    api.systemState().then(setSnapshot).catch(console.error);
  }, []);

  if (!snapshot) return <div>Loading system state…</div>;

  return (
    <div className="panel state">
      <h2>System State Snapshot</h2>
      <p>Kernel processes: {snapshot.kernel.processes.length}</p>
      <p>SIM agents: {snapshot.sim.agents.length}</p>
      <p>Umbrella rules: {snapshot.umbrella.rules.length}</p>
      <p>Identity: {snapshot.identity.name}</p>
      <p>Planetary mode: {snapshot.planetary.mode}</p>
      <p>Windows: {snapshot.windows.windows.length}</p>
    </div>
  );
}
