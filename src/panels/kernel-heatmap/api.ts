import type { HeatPoint } from './types';

const ENDPOINT = '/api/kernel/heatmap';

function isHeatPoint(value: unknown): value is HeatPoint {
  if (!value || typeof value !== 'object') return false;
  const point = value as Record<string, unknown>;
  return typeof point.process === 'string'
    && typeof point.density === 'number'
    && typeof point.pressure === 'number'
    && (point.event === undefined || point.event === 'spawn' || point.event === 'kill' || point.event === 'transition');
}

export async function fetchHeatmap(): Promise<HeatPoint[]> {
  const response = await fetch(ENDPOINT, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Heatmap request failed (${response.status})`);
  const value: unknown = await response.json();
  if (!Array.isArray(value) || !value.every(isHeatPoint)) throw new Error('Heatmap endpoint must return an array of valid samples');
  return value;
}
