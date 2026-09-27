// portal-os-console/src/components/PortalDiffPanel.tsx
// Portal‑OS v12 — Portal Diff Panel (Phase‑12 Diff Engine UI)

import React, { useEffect, useState } from "react";
import {
  kernelPortalTimeline,
  kernelPortalDiff,
} from "../api/kernel";

export default function PortalDiffPanel() {
  const [timeline, setTimeline] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
  // Run diff
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
        <h2>Portal Diff Engine</h2>
        <p>Loading timeline…</p>
      </div>
    );
  }

  const events = timeline.events ?? [];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Portal Diff Engine</h2>

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

            <button onClick={() => setFromEvent(e.id)}>
              Set as Diff From
            </button>

            <button
              onClick={() => setToEvent(e.id)}
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
        <h3>Run Diff</h3>

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
