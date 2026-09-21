export type PanelState<T = unknown> = { loading: boolean; error?: string; data?: T };
export type FocusEvent = { id: string; title: string; z: number; focused: boolean; timestamp?: string };
export type FocusNode = FocusEvent & { x: number; y: number };
