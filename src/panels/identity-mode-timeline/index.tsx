import { useEffect, useMemo, useState } from 'react';
import { PanelCard } from '../../ui/PanelCard';
import { fetchTimeline } from './api';
import { timelineRows } from './logic';
import type { IdentityEvent, PanelState } from './types';
import './style.css';
export function IdentityModeTimelinePanel() { const [state, setState] = useState<PanelState<IdentityEvent[]>>({ loading: true }); useEffect(() => { fetchTimeline().then((data) => setState({ loading: false, data })).catch((e) => setState({ loading: false, error: e instanceof Error ? e.message : 'Request failed' })); }, []); const rows = useMemo(() => timelineRows(state.data ?? []), [state.data]); return <PanelCard title="Identity Mode Timeline"><div className="identity-timeline">{state.loading && 'Loading…'}{state.error && <p className="error">{state.error}</p>}{state.data && rows.map((row) => <div className="timeline-row" key={row.id}><span className="timeline-dot" /><strong>{row.mode}</strong><span>{row.event}</span><time>{row.timestamp}</time></div>)}</div></PanelCard>; }
