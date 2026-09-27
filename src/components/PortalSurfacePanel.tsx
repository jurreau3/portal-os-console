// portal-os-console/src/components/PortalSurfacePanel.tsx
// Portal‑OS v12 — Portal Surface Panel (Main Portal UI Wrapper)

import React, { useEffect, useState } from "react";
import PortalSurface from "./PortalSurface";
import {
  kernelPortal,
  kernelPortalTimeline,
} from "../api/kernel";

export default function PortalSurfacePanel() {
  const [surface, setSurface] = useState<any>(null);
  const [timeline, setTimeline] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  async function closePanel(id: string) {
    await kernelPortal("close", { panel: id });
    await fetchSurface();
  }

  async function openDemoPanel() {
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

  // ------------------------------------------------------------
  // Initial load
  // ------------------------------------------------------------
  useEffect(() => {
    fetchSurface();
  }, []);

  if (loading || !surface) {
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

      <button onClick={openDemoPanel} style={{ marginBottom: "1rem" }}>
        Open Demo Panel
      </button>

      <PortalSurface
        surface={surface}
        onMove={movePanel}
        onResize={resizePanel}
        onToggle={togglePanel}
        onClose={closePanel}
      />

      <section style={{ marginTop: "1rem" }}>
        <h3>Timeline</h3>
        <pre>{JSON.stringify(timeline, null, 2)}</pre>
      </section>
    </div>
  );
}
