// portal-os-console/src/components/PortalSimPanel.tsx
// Portal‑OS v12 — SIM Lane Panel (Simulation Mode Inspector)

import React, { useState } from "react";
import { kernelSim } from "../api/kernel";

export default function PortalSimPanel() {
  const [payload, setPayload] = useState<string>('{"test":"sim"}');
  const [result, setResult] = useState<any>(null);

  // ------------------------------------------------------------
  // SIM action
  // ------------------------------------------------------------
  async function sendSim() {
    let parsed: any = {};

    try {
      parsed = JSON.parse(payload);
    } catch {
      parsed = { error: "Invalid JSON payload" };
    }

    const res = await kernelSim(parsed);
    setResult(res);
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>SIM Lane</h2>

      <section>
        <h3>Payload (JSON)</h3>
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          rows={6}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
      </section>

      <button onClick={sendSim}>Send SIM Envelope</button>

      <section style={{ marginTop: "1rem" }}>
        <h3>Result</h3>
        {result ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : (
          <p>No SIM envelope sent yet.</p>
        )}
      </section>
    </div>
  );
}
