// portal-os-console/src/components/PortalWindowsPanel.tsx
// Portal‑OS v12 — Windows Lane Panel (Open/Close Window Actions)

import React, { useState } from "react";
import { kernelWindows } from "../api/kernel";

export default function PortalWindowsPanel() {
  const [windowId, setWindowId] = useState<string>("demo-window");
  const [result, setResult] = useState<any>(null);

  // ------------------------------------------------------------
  // Windows actions
  // ------------------------------------------------------------
  async function openWindow() {
    const res = await kernelWindows("open", windowId);
    setResult(res);
  }

  async function closeWindow() {
    const res = await kernelWindows("close", windowId);
    setResult(res);
  }

  async function noopWindow() {
    const res = await kernelWindows("noop", windowId);
    setResult(res);
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Windows Lane</h2>

      <section>
        <h3>Window ID</h3>
        <input
          value={windowId}
          onChange={(e) => setWindowId(e.target.value)}
          placeholder="window-id"
          style={{ marginBottom: "1rem" }}
        />
      </section>

      <section>
        <h3>Actions</h3>

        <button onClick={openWindow}>Open Window</button>
        <button onClick={closeWindow} style={{ marginLeft: "0.5rem" }}>
          Close Window
        </button>
        <button onClick={noopWindow} style={{ marginLeft: "0.5rem" }}>
          Noop
        </button>
      </section>

      <section style={{ marginTop: "1rem" }}>
        <h3>Result</h3>
        {result ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : (
          <p>No action yet.</p>
        )}
      </section>
    </div>
  );
}
