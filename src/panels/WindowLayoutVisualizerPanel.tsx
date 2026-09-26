// src/panels/WindowLayoutVisualizerPanel.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { WindowLayout } from '../api/types';

export function WindowLayoutVisualizerPanel() {
  const [layout, setLayout] = useState<WindowLayout | null>(null);

  useEffect(() => {
    api.windowLayout().then(setLayout).catch(console.error);
  }, []);

  if (!layout) return <div>Loading window layout…</div>;

  return (
    <div className="panel window-layout">
      <h2>Window Layout</h2>
      <p>Layout ID: {layout.layoutId}</p>
      <p>Updated: {new Date(layout.updatedAt).toLocaleString()}</p>
      <ul>
        {layout.windows.map(w => (
          <li key={w.id}>
            {w.title} — {w.state}
          </li>
        ))}
      </ul>
    </div>
  );
}
