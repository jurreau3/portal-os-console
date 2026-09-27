// portal-os-console/src/components/PortalIdentityPanel.tsx
// Portal‑OS v12 — Identity Lane Panel (Echo + Identity Envelope)

import React, { useState } from "react";
import { kernelIdentity } from "../api/kernel";

export default function PortalIdentityPanel() {
  const [identity, setIdentity] = useState<string>("console-user");
  const [payload, setPayload] = useState<string>('{"hello":"world"}');
  const [result, setResult] = useState<any>(null);

  // ------------------------------------------------------------
  // Identity action
  // ------------------------------------------------------------
  async function sendIdentity() {
    let parsed: any = {};

    try {
      parsed = JSON.parse(payload);
    } catch {
      parsed = { error: "Invalid JSON payload" };
    }

    const res = await kernelIdentity(parsed);
    setResult(res);
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Identity Lane</h2>

      <section>
        <h3>Identity</h3>
        <input
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          placeholder="identity"
          style={{ marginBottom: "1rem" }}
        />
      </section>

      <section>
        <h3>Payload (JSON)</h3>
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          rows={6}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
      </section>

      <button onClick={sendIdentity}>Send Identity Envelope</button>

      <section style={{ marginTop: "1rem" }}>
        <h3>Result</h3>
        {result ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : (
          <p>No identity envelope sent yet.</p>
        )}
      </section>
    </div>
  );
}
