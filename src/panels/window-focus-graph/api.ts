import type { FocusEvent } from './types';
export async function fetchFocus(): Promise<FocusEvent[]> { const response = await fetch('/api/windows/focus'); if (!response.ok) throw new Error(`Focus request failed (${response.status})`); const value: unknown = await response.json(); if (!Array.isArray(value)) throw new Error('Focus endpoint must return an array'); return value as FocusEvent[]; }
