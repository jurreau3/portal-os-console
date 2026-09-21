import type { BehaviorEvent } from './types';
const ENDPOINT = '/api/sim/behavior';
export async function fetchBehavior(): Promise<BehaviorEvent[]> { const response = await fetch(ENDPOINT); if (!response.ok) throw new Error(`Behavior request failed (${response.status})`); const value: unknown = await response.json(); if (!Array.isArray(value)) throw new Error('Behavior endpoint must return an array'); return value as BehaviorEvent[]; }
