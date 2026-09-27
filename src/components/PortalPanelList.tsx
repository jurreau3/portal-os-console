// portal-os-console/src/components/PortalPanelList.tsx
// Portal‑OS v12 — Portal Panel List (Panel Collection Renderer)

import React from "react";
import PortalPanel from "./PortalPanel";

export default function PortalPanelList({
  panels,
  onMove,
  onResize,
  onToggle,
  onClose,
}: {
  panels: any[];
  onMove: (id: string) => void;
  onResize: (id: string) => void;
  onToggle: (id: string) => void;
  onClose: (id: string) => void;
}) {
  if (!panels || panels.length === 0) {
    return (
      <div style={{ padding: "1rem" }}>
        <p>No panels open.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      {panels.map((panel) => (
        <PortalPanel
          key={panel.id}
          panel={panel}
          onMove={onMove}
          onResize={onResize}
          onToggle={onToggle}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
