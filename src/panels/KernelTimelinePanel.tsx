// src/panels/KernelTimelinePanel.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { KernelEvent } from '../api/types';

export function KernelTimelinePanel() {
  const [events, setEvents] = useState<KernelEvent[]>([]);

  useEffect(() => {
    api.kernelTimeline().then(setEvents).catch(console.error);
  }, []);

  if (!events.length) return <div>No kernel events.</div>;

  return (
    <div className="panel kernel-timeline">
      <h2>Kernel Timeline</h2>
      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            [{new Date(ev.timestamp).toLocaleTimeString()}] {ev.type}
            {ev.pid && ` (pid: ${ev.pid})`}
            {ev.details && ` — ${ev.details}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
