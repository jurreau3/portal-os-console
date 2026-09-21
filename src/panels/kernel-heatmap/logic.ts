import type { HeatCell, HeatPoint } from './types';

export function toCells(points: HeatPoint[]): HeatCell[] {
  const maxPressure = Math.max(...points.map((point) => point.pressure), 1);
  return points.map((point, index) => ({
    ...point,
    key: `${point.process}-${point.event ?? 'sample'}-${index}`,
    normalizedPressure: Math.min(1, Math.max(0, point.pressure / maxPressure)),
  }));
}
