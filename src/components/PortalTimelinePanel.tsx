// portal-os-console/src/components/PortalTimelinePanel.tsx
// Portal‑OS v12 — Timeline Panel (Replay + Diff + Event Inspector)

import React, { useEffect, useState } from "react";
import {
  kernelPortalTimeline,
  kernelPortalReplay,
  kernelPortalDiff,
} from "../api/kernel";

export default function PortalTimelinePanel() {
  const [timeline, setTimeline] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [replaySurface, setReplaySurface] = useState<any>(null);

  const [fromEvent, setFromEvent] = useState<string>("");
  const [toEvent, setToEvent] = useState<string>("");
  const [diff, setDiff] = useState<any>(null);

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
  // Replay engine
  // ------------------------------------------------------------
  async function replayEvent() {
    if (!selectedEvent) return;

    const res = await kernelPortalReplay(selectedEvent);
    setReplaySurface(res.surface);
  }

  // ------------------------------------------------------------
  // Diff engine
  // ------------------------------------------------------------
  async function runDiff() {
    if (!fromEvent || !toEvent) return;

    const res = await kernelPortalDiff(fromEvent, toEvent);
    setDiff(res);
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
        <h2>Portal Timeline</h2>
        <p>Loading timeline…</p>
      </div>
    );
  }

  const events = timeline.events ?? [];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Portal Timeline</h2>

      <section>
        <h3>Events</h3>

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

            <button
              onClick={() => {
                setFromEvent(e.id);
              }}
              style={{ marginLeft: "0.5rem" }}
            >
              Set as Diff From
            </button>

            <button
              onClick={() => {
                setToEvent(e.id);
              }}
              style={{ marginLeft: "0.5rem" }}
            >
              Set as Diff To
            </button>

            <pre style={{ marginTop: "0.5rem" }}>
              {JSON.stringify(e.payload, null, 2)}
            </pre>
          </div>
        ))}
      </section>

      <section>
        <h3>Replay Engine</h3>

        <p>Selected Event: {selectedEvent || "none"}</p>

        <button onClick={replayEvent}>Replay Selected Event</button>

        {replaySurface && (
          <pre style={{ marginTop: "1rem" }}>
            {JSON.stringify(replaySurface, null, 2)}
          </pre>
        )}
      </section>

      <section>
        <h3>Diff Engine</h3>

        <p>
          From: {fromEvent || "none"} — To: {toEvent || "none"}
        </p>

        <button onClick={runDiff}>Run Diff</button>

        {diff && (
          <pre style={{ marginTop: "1rem" }}>
            {JSON.stringify(diff, null, 2)}
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
