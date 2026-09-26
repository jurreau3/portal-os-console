// src/components/PlanetaryModePanel.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { PlanetaryState } from '../api/types';

export function PlanetaryModePanel() {
  const [state, setState] = useState<PlanetaryState | null>(null);

  useEffect(() => {
    api.planetary().then(setState).catch(console.error);
  }, []);

  if (!state) return <div>Loading planetary mode…</div>;

  return (
    <div className="panel planetary-mode">
      <h2>Planetary Mode</h2>
      <p>Mode: {state.mode}</p>
      <p>Enforcement: {state.enforcement}</p>
      <p>Phase: {state.phase}</p>
    </div>
  );
}
