export type PanelState<T = unknown> = { loading: boolean; error?: string; data?: T };
export type BehaviorEvent = { agentId: string; tick: number; action: string; state?: string };
