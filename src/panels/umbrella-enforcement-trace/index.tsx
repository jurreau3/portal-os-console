import { useEffect, useMemo, useState } from 'react';
import { PanelCard } from '../../ui/PanelCard';
import { fetchEnforcement } from './api';
import { groupByRule } from './logic';
import type { EnforcementEvent, PanelState } from './types';
import './style.css';
export function UmbrellaEnforcementTracePanel() { const [state, setState] = useState<PanelState<EnforcementEvent[]>>({ loading: true }); useEffect(() => { fetchEnforcement().then((data) => setState({ loading: false, data })).catch((e) => setState({ loading: false, error: e instanceof Error ? e.message : 'Request failed' })); }, []); const groups = useMemo(() => groupByRule(state.data ?? []), [state.data]); return <PanelCard title="Umbrella Enforcement Trace"><div className="advanced-panel">{state.loading && 'Loading…'}{state.error && <p className="error">{state.error}</p>}{state.data && <><div className="trace-graph">{groups.map((group) => <div className={group.hit ? 'trace-hit' : 'trace-miss'} key={group.ruleId}><strong>{group.ruleId}</strong><span>{group.hits} hits / {group.misses} misses</span></div>)}</div><pre className="payload">{JSON.stringify(state.data, null, 2)}</pre></>}</div></PanelCard>; }
