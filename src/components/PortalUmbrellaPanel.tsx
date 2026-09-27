// portal-os-console/src/components/PortalUmbrellaPanel.tsx
// Portal‑OS v12 — Umbrella Lane Panel (Governance Mode Inspector)

import React, { useState } from "react";
import { kernelUmbrella } from "../api/kernel";

export default function PortalUmbrellaPanel() {
  const [payload, setPayload] = useState<string>('{"policy":"test"}');
  const [result, setResult] = useState<any>(null);

  // ------------------------------------------------------------
  // Umbrella action
  // ------------------------------------------------------------
  async function sendUmbrella() {
    let parsed: any = {};

    try {
      parsed = JSON.parse(payload);
    } catch {
      parsed = { error: "Invalid JSON payload" };
    }

    const res = await kernelUmbrella(parsed);
    setResult(res);
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Umbrella Lane</h2>

      <section>
        <h3>Payload (JSON)</h3>
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          rows={6}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
      </section>

      <button onClick={sendUmbrella}>Send Umbrella Envelope</button>

      <section style={{ marginTop: "1rem" }}>
        <h3>Result</h3>
        {result ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : (
          <p>No umbrella envelope sent yet.</p>
        )}
      </section>
    </div>
  );
}
