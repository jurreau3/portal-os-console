// portal-os-console/src/components/PortalSurface.tsx
// Portal‑OS v12 — Portal Surface (Phase‑12 Surface Renderer)

import React from "react";
import PortalPanelList from "./PortalPanelList";

export default function PortalSurface({
  surface,
  onMove,
  onResize,
  onToggle,
  onClose,
}: {
  surface: any;
  onMove: (id: string) => void;
  onResize: (id: string) => void;
  onToggle: (id: string) => void;
  onClose: (id: string) => void;
}) {
  if (!surface) {
    return (
      <div style={{ padding: "1rem" }}>
        <p>No surface loaded.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Portal Surface</h2>

      <PortalPanelList
        panels={surface.panels ?? []}
        onMove={onMove}
        onResize={onResize}
        onToggle={onToggle}
        onClose={onClose}
      />

      <section style={{ marginTop: "1rem" }}>
        <h3>Raw Surface Envelope</h3>
        <pre>{JSON.stringify(surface, null, 2)}</pre>
      </section>
    </div>
  );
}
