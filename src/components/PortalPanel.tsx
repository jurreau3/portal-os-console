// portal-os-console/src/components/PortalPanel.tsx
// Portal‑OS v12 — Portal Panel Component (Base Panel Renderer)

import React from "react";

export default function PortalPanel({
  panel,
  onMove,
  onResize,
  onToggle,
  onClose,
}: {
  panel: any;
  onMove: (id: string) => void;
  onResize: (id: string) => void;
  onToggle: (id: string) => void;
  onClose: (id: string) => void;
}) {
  if (!panel.visible) {
    return (
      <div
        style={{
          border: "1px solid #333",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          background: "#111",
          opacity: 0.5,
        }}
      >
        <strong>{panel.title}</strong> (hidden)
        <p>ID: {panel.id}</p>

        <button onClick={() => onToggle(panel.id)}>Show</button>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "1px solid #444",
        padding: "0.5rem",
        marginBottom: "0.5rem",
        background: "#1a1a1a",
      }}
    >
      <strong>{panel.title}</strong>
      <p>ID: {panel.id}</p>
      <p>
        Position: ({panel.x}, {panel.y}) — Size: {panel.width}×{panel.height}
      </p>

      <button onClick={() => onMove(panel.id)}>Move</button>
      <button onClick={() => onResize(panel.id)} style={{ marginLeft: "0.5rem" }}>
        Resize
      </button>
      <button onClick={() => onToggle(panel.id)} style={{ marginLeft: "0.5rem" }}>
        Toggle
      </button>
      <button onClick={() => onClose(panel.id)} style={{ marginLeft: "0.5rem" }}>
        Close
      </button>
    </div>
  );
}
