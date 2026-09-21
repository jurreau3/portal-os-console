export interface WorkerPortalState {
  state: string;
  intensity: number;
  entity: string;
}

export interface PortalWorkerApi {
  getState(): Promise<WorkerPortalState>;
  update(payload: Partial<WorkerPortalState>): Promise<WorkerPortalState>;
}

export const portalWorker: PortalWorkerApi = {
  async getState() {
    return { state: 'idle', intensity: 0.6, entity: 'portal' };
  },
  async update(payload) {
    return {
      state: payload.state ?? 'active',
      intensity: payload.intensity ?? 0.7,
      entity: payload.entity ?? 'portal',
    };
  },
};
