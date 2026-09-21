export type PanelState<T = unknown> = { loading: boolean; error?: string; data?: T };
export type EnforcementEvent = { ruleId: string; result: 'hit' | 'miss'; subject?: string; timestamp?: string };
export type RuleSummary = { ruleId: string; hits: number; misses: number; hit: boolean };
