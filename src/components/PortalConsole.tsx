// portal-os-console/src/components/PortalConsole.tsx
// Portal‑OS v12 — Master Console Shell (Phase‑12 Console Router)

import React, { useState } from "react";

import PortalSurfacePanel from "./PortalSurfacePanel";
import PortalTimelinePanel from "./PortalTimelinePanel";
import PortalDiffPanel from "./PortalDiffPanel";
import PortalReplayPanel from "./PortalReplayPanel";
import PortalWindowsPanel from "./PortalWindowsPanel";
import PortalIdentityPanel from "./PortalIdentityPanel";
import PortalSimPanel from "./PortalSimPanel";
import PortalUmbrellaPanel from "./PortalUmbrellaPanel";

export default function PortalConsole() {
  const [active, setActive] = useState<string>("surface");

  const panels = [
    { id: "surface", label: "Surface" },
    { id: "timeline", label: "Timeline" },
    { id: "diff", label: "Diff" },
    { id: "replay", label: "Replay" },
    { id: "windows", label: "Windows" },
    { id: "identity", label: "Identity" },
    { id: "sim", label: "SIM" },
    { id: "umbrella", label: "Umbrella" },
  ];

  function renderPanel() {
    switch (active) {
      case "surface":
        return <PortalSurfacePanel />;
      case "timeline":
        return <PortalTimelinePanel />;
      case "diff":
        return <PortalDiffPanel />;
      case "replay":
        return <PortalReplayPanel />;
      case "windows":
        return <PortalWindowsPanel />;
      case "identity":
        return <PortalIdentityPanel />;
      case "sim":
        return <PortalSimPanel />;
      case "umbrella":
        return <PortalUmbrellaPanel />;
      default:
        return <PortalSurfacePanel />;
    }
  }

  return (
    <div style={styles.console}>
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarTitle}>Portal‑OS Console</h3>

        <ul style={styles.navList}>
          {panels.map((p) => (
            <li
              key={p.id}
              style={{
                ...styles.navItem,
                ...(active === p.id ? styles.navItemActive : {}),
              }}
              onClick={() => setActive(p.id)}
            >
              {p.label}
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.panelSurface}>{renderPanel()}</div>
    </div>
  );
}

const styles = {
  console: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    background: "#111",
    color: "#eee",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "220px",
    background: "#1a1a1a",
