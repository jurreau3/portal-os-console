export type PanelState<T = unknown> = { loading: boolean; error?: string; data?: T };
export type HeatPoint = { process: string; density: number; pressure: number; event?: 'spawn' | 'kill' | 'transition' };
export type HeatCell = HeatPoint & { key: string };
