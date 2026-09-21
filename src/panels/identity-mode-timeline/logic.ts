import type { IdentityEvent, TimelineRow } from './types';
export function timelineRows(events: IdentityEvent[]): TimelineRow[] { return [...events].sort((a, b) => a.timestamp.localeCompare(b.timestamp)).map((event) => ({ ...event, id: `${event.timestamp}-${event.mode}-${event.event}` })); }
