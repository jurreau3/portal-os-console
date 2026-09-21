export type PanelState<T = unknown> = { loading: boolean; error?: string; data?: T };
export type IdentityEvent = { mode: string; event: 'transition' | 'token-refresh' | 'session'; timestamp: string; sessionId?: string };
export type TimelineRow = IdentityEvent & { id: string };
