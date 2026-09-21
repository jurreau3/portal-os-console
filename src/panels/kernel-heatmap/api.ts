import type { HeatPoint } from './types';
export async function fetchHeatmap(): Promise<HeatPoint[]> { const response = await fetch('/api/kernel/heatmap'); if (!response.ok) throw new Error(`Heatmap request failed (${response.status})`); const value: unknown = await response.json(); if (!Array.isArray(value)) throw new Error('Heatmap endpoint must return an array'); return value as HeatPoint[]; }
