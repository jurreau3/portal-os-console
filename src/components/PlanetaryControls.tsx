// src/components/PlanetaryControls.tsx

import React, { useState } from 'react';
import { api } from '../api/client';
import type { PlanetaryToggleResponse } from '../api/types';

export function PlanetaryControls() {
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  const toggle = async () => {
    try {
      const res: PlanetaryToggleResponse = await api.planetaryToggle();
      setLastMessage(res.message);
    } catch (e) {
      setLastMessage(
        e instanceof Error ? e.message : 'Failed to toggle planetary mode',
      );
    }
  };

  return (
    <div className="panel planetary-controls">
      <button onClick={toggle}>Toggle Planetary Mode</button>
      {lastMessage && <p>{lastMessage}</p>}
    </div>
  );
}
