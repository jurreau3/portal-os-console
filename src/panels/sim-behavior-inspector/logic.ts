import type { BehaviorEvent } from './types';
export function summarizeBehavior(events: BehaviorEvent[]): string { if (!events.length) return ''; const max = Math.max(...events.map((e) => e.tick), 1); return events.map((e, i) => `${(i / Math.max(events.length - 1, 1)) * 580 + 10},${160 - (e.action.length % 8) * 14 - (e.tick / max) * 80}`).join(' '); }
