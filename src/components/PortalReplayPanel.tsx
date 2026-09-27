// portal-os-console/src/components/PortalReplayPanel.tsx
// Portal‑OS v12 — Portal Replay Panel (Phase‑12 Replay Engine UI)

import React, { useEffect, useState } from "react";
import {
  kernelPortalTimeline,
  kernelPortalReplay,
} from "../api/kernel";

export default function PortalReplayPanel() {
  const [timeline, setTimeline] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [replaySurface, setReplaySurface] = useState<any>(null);

  // ------------------------------------------------------------
  // Fetch timeline
  // ------------------------------------------------------------
  async function fetchTimeline() {
    setLoading(true);
    const tl = await kernelPortalTimeline();
    setTimeline(tl);
    setLoading(false);
  }

  // ------------------------------------------------------------
  // Replay selected event
  // ------------------------------------------------------------
  async function replayEvent() {
    if (!selectedEvent) return;

    const res = await kernelPortalReplay(selectedEvent);
    setReplaySurface(res.surface);
  }

  // ------------------------------------------------------------
  // Initial load
  // ------------------------------------------------------------
  useEffect(() => {
    fetchTimeline();
  }, []);

  if (loading || !timeline) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Portal Replay Engine</h2>
        <p>Loading timeline…</p>
      </div>
    );
  }

  const events = timeline.events ?? [];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Portal Replay Engine</h2>

      <section>
        <h3>Timeline Events</h3>

        {events.length === 0 && <p>No timeline events recorded.</p>}

        {events.map((e: any) => (
          <div
            key={e.id}
            style={{
              border: "1px solid #444",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              background: "#1a1a1a",
            }}
          >
            <strong>{e.action}</strong>
            <p>ID: {e.id}</p>
            <p>Panel: {e.panel ?? "none"}</p>
            <p>Timestamp: {new Date(e.timestamp).toLocaleString()}</p>

            <button onClick={() => setSelectedEvent(e.id)}>
              Select for Replay
            </button>

            <pre style={{ marginTop: "0.5rem" }}>
              {JSON.stringify(e.payload, null, 2)}
            </pre>
          </div>
        ))}
      </section>

      <section>
        <h3>Replay Selected Event</h3>

        <p>Selected Event: {selectedEvent || "none"}</p>

        <button onClick={replayEvent}>Replay</button>

        {replaySurface && (
          <pre style={{ marginTop: "1rem" }}>
            {JSON.stringify(replaySurface, null, 2)}
          </pre>
        )}
      </section>

      <section>
        <h3>Raw Timeline Envelope</h3>
        <pre>{JSON.stringify(timeline, null, 2)}</pre>
      </section>
    </div>
  );
}
