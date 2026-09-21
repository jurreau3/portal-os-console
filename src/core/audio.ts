export interface AudioReactiveState {
  bass: number;
  treble: number;
  shimmer: number;
  intensity: number;
}

export function createAudioReactiveEngine(initial: Partial<AudioReactiveState> = {}) {
  const state: AudioReactiveState = {
    bass: 0.4,
    treble: 0.35,
    shimmer: 0.3,
    intensity: 0.6,
    ...initial,
  };

  return {
    getState() {
      return { ...state };
    },
    update(next: Partial<AudioReactiveState>) {
      Object.assign(state, next);
      state.intensity = Math.min(1, Math.max(0, state.bass * 0.55 + state.treble * 0.25 + state.shimmer * 0.2));
      return { ...state };
    },
  };
}
