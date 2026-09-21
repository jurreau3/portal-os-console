import type { HeatPoint, HeatCell } from './types';
export function toCells(points: HeatPoint[]): HeatCell[] { return points.map((point, index) => ({ ...point, key: `${point.process}-${index}` })); }
