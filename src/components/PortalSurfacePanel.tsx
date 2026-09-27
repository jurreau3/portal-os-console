// portal-os-console/src/components/PortalSurfacePanel.tsx
// Portal‑OS v12 — Portal Surface Panel (Replay + Timeline + Diff Compatible)

import React, { useEffect, useState } from "react";
import {
  kernelPortal,
  kernelPortalTimeline,
  kernelPortalDiff,
  kernelPortalReplay,
} from "../api/kernel";

export default function PortalSurfacePanel() {
  const [surface, setSurface] = useState<any>(null);
  const [timeline, setTimeline] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [fromEvent, setFromEvent] = useState<string>("");
  const [toEvent, setToEvent] = useState<string>("");
  const [diff, setDiff] = useState<any>(null);

  const [replayEvent, setReplayEvent] = useState<string>("");
  const [replaySurface, setReplaySurface] = useState<any>(null);

  // ------------------------------------------------------------
  // Fetch surface + timeline
  // ------------------------------------------------------------
  async function fetchSurface() {
    setLoading(true);

    const res = await kernelPortal("noop");
    setSurface(res.surface ?? null);

    const tl = await kernelPortalTimeline();
    setTimeline(tl);

    setLoading(false);
  }

  // ------------------------------------------------------------
  // Portal actions
  // ------------------------------------------------------------
  async function openPanel() {
    await kernelPortal("open", {
      panel: "demo",
      title: "Demo Panel",
      x: 100,
      y: 100,
      width: 300,
      height: 200,
    });
    await fetchSurface();
  }

  async function closePanel(id: string) {
    await kernelPortal("close", { panel: id });
    await fetchSurface();
  }

  async function movePanel(id: string) {
    await kernelPortal("move", {
      panel: id,
      x: Math.floor(Math.random() * 400),
      y: Math.floor(Math.random() * 300),
    });
    await fetchSurface();
  }

  async function resizePanel(id: string) {
    await kernelPortal("resize", {
      panel: id,
      width: 200 + Math.floor(Math.random() * 200),
      height: 150 + Math.floor(Math.random() * 200),
    });
    await fetchSurface();
  }

  async function togglePanel(id: string) {
    await kernelPortal("toggle", {
      panel: id,
      visible: Math.random() > 0.5,
    });
    await fetchSurface();
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
  // Replay engine
  // ------------------------------------------------------------
  async function runReplay() {
    if (!replayEvent) return;

    const res = await kernelPortalReplay(replayEvent);
    setReplaySurface(res.surface);
  }

  // ------------------------------------------------------------
  // Initial load
  // ------------------------------------------------------------
  useEffect(() => {
    fetchSurface();
  }, []);

  if (loading || !surface || !timeline) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Portal Surface</h2>
        <p>Loading surface…</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Portal Surface</h2>

      <button onClick={openPanel} style={{ marginBottom: "1rem" }}>
        Open Demo Panel
      </button>

      <section>
        <h3>Panels</h3>
        {surface.panels.length === 0 && <p>No panels open.</p>}

        {surface.panels.map((p: any) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #444",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              background: "#1a1a1a",
            }}
          >
            <strong>{p.title}</strong>
            <p>ID: {p.id}</p>
            <p>
              Position: ({p.x}, {p.y}) — Size: {p.width}×{p.height}
            </p>
            <p>Visible: {p.visible ? "yes" : "no"}</p>

            <button onClick={() => movePanel(p.id)}>Move</button>
            <button onClick={() => resizePanel(p.id)}>Resize</button>
            <button onClick={() => togglePanel(p.id)}>Toggle</button>
            <button onClick={() => closePanel(p.id)}>Close</button>
          </div>
        ))}
      </section>

      <section>
        <h3>Timeline</h3>
        <pre>{JSON.stringify(timeline, null, 2)}</pre>
      </section>

      <section>
        <h3>Diff Engine</h3>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>From Event:</label>
          <input
            value={fromEvent}
            onChange={(e) => setFromEvent(e.target.value)}
            placeholder="event-id"
            style={{ marginLeft: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>To Event:</label>
          <input
            value={toEvent}
            onChange={(e) => setToEvent(e.target.value)}
            placeholder="event-id"
            style={{ marginLeft: "0.5rem" }}
          />
        </div>

        <button onClick={runDiff}>Run Diff</button>

        {diff && (
          <pre style={{ marginTop: "1rem" }}>
            {JSON.stringify(diff, null, 2)}
          </pre>
        )}
      </section>

      <section>
        <h3>Replay Engine</h3>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Replay Event:</label>
          <input
            value={replayEvent}
            onChange={(e) => setReplayEvent(e.target.value)}
            placeholder="event-id"
            style={{ marginLeft: "0.5rem" }}
          />
        </div>

        <button onClick={runReplay}>Replay</button>

        {replaySurface && (
          <pre style={{ marginTop: "1rem" }}>
            {JSON.stringify(replaySurface, null, 2)}
          </pre>
        )}
      </section>

      <section>
        <h3>Raw Surface Envelope</h3>
        <pre>{JSON.stringify(surface, null, 2)}</pre>
      </section>
    </div>
  );
}
