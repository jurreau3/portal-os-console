// src/components/Phase11Panel.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { Phase11State } from '../api/types';

export function Phase11Panel() {
  const [state, setState] = useState<Phase11State | null>(null);

  useEffect(() => {
    api.phase11().then(setState).catch(console.error);
  }, []);

  if (!state) return <div>Loading Phase‑11…</div>;

  return (
    <div className="panel phase11">
      <h2>Phase‑11 Substrate</h2>
      <p>Active: {state.active ? 'Yes' : 'No'}</p>
      <p>Level: {state.level}</p>
      {state.description && <p>Description: {state.description}</p>}
    </div>
  );
}
