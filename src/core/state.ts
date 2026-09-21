export type PortalFrameState = 'idle' | 'active' | 'engaged';

export interface PortalStateSnapshot {
  state: PortalFrameState;
  intensity: number;
  lastUpdated: number;
}

export interface PortalStateMachine {
  getState(): PortalStateSnapshot;
  trigger(event: string): PortalStateSnapshot;
  pulse(intensity: number): PortalStateSnapshot;
}

export function createPortalStateMachine(): PortalStateMachine {
  let state: PortalFrameState = 'idle';
  let intensity = 0.6;
  let lastUpdated = Date.now();

  const snapshot = (): PortalStateSnapshot => ({ state, intensity, lastUpdated });

  return {
    getState: snapshot,
    trigger(event: string) {
      if (event === 'hover') state = 'active';
      if (event === 'click') state = 'engaged';
      if (event === 'reset') state = 'idle';
      lastUpdated = Date.now();
      return snapshot();
    },
    pulse(nextIntensity: number) {
      intensity = Math.min(1, Math.max(0, nextIntensity));
      state = intensity > 0.85 ? 'engaged' : intensity > 0.45 ? 'active' : 'idle';
      lastUpdated = Date.now();
      return snapshot();
    },
  };
}
