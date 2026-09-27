// portal-os-console/src/api/kernel.ts
// Portal‑OS v12 — Kernel API Wrapper (Phase‑12 Compatible)

export interface KernelRequest {
  id: string;
  lane: string;
  identity: string;
  payload: any;
}

export async function kernelRequest(
  lane: string,
  payload: any = {},
  identity: string = "console"
) {
  const envelope: KernelRequest = {
    id: crypto.randomUUID(),
    lane,
    identity,
    payload,
  };

  const res = await fetch("/kernel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(envelope),
  });

  return res.json();
}

// ------------------------------------------------------------
// Identity lane
// ------------------------------------------------------------
export function kernelIdentity(payload: any) {
  return kernelRequest("identity", payload);
}

// ------------------------------------------------------------
// Windows lane
// ------------------------------------------------------------
export function kernelWindows(action: string, windowId: string | null = null) {
  return kernelRequest("windows", { action, window: windowId });
}

// ------------------------------------------------------------
// SIM lane
// ------------------------------------------------------------
export function kernelSim(payload: any) {
  return kernelRequest("sim", payload);
}

// ------------------------------------------------------------
// Umbrella lane
// ------------------------------------------------------------
export function kernelUmbrella(payload: any) {
  return kernelRequest("umbrella", payload);
}

// ------------------------------------------------------------
// Portal lane
// ------------------------------------------------------------
export function kernelPortal(action: string, payload: any = {}) {
  return kernelRequest("portal", { action, ...payload });
}

// ------------------------------------------------------------
// Portal timeline
// ------------------------------------------------------------
export function kernelPortalTimeline() {
  return kernelRequest("portal:timeline");
}

// ------------------------------------------------------------
// Portal diff
// ------------------------------------------------------------
export function kernelPortalDiff(fromId: string, toId: string) {
  return kernelRequest("portal:diff", { from: fromId, to: toId });
}

// ------------------------------------------------------------
// Portal replay
// ------------------------------------------------------------
export function kernelPortalReplay(eventId: string) {
  return kernelRequest("portal:replay", { eventId });
}

// ------------------------------------------------------------
// ⭐ Phase‑12 planetary substrate
// ------------------------------------------------------------
export function kernelPlanetary() {
  return kernelRequest("planetary");
}

export function kernelPlanetaryTick() {
  return kernelRequest("planetary:tick");
}

export function kernelPlanetaryEntropy() {
  return kernelRequest("planetary:entropy");
}
