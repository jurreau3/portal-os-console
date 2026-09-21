import { useEffect, useMemo, useState } from 'react';
import { PanelCard } from '../../ui/PanelCard';
import { fetchBehavior } from './api';
import { summarizeBehavior } from './logic';
import type { BehaviorEvent, PanelState } from './types';
import './style.css';

export function SIMBehaviorInspectorPanel() {
  const [state, setState] = useState<PanelState<BehaviorEvent[]>>({ loading: true });
  useEffect(() => { fetchBehavior().then((data) => setState({ loading: false, data })).catch((e) => setState({ loading: false, error: e instanceof Error ? e.message : 'Request failed' })); }, []);
  const points = useMemo(() => summarizeBehavior(state.data ?? []), [state.data]);
  return <PanelCard title="SIM Behavior Inspector"><div className="advanced-panel">{state.loading && 'Loading…'}{state.error && <p className="error">{state.error}</p>}{state.data && <><svg className="behavior-chart" viewBox="0 0 600 180" role="img" aria-label="SIM behavior timeline"><polyline points={points} /></svg><pre className="payload">{JSON.stringify(state.data, null, 2)}</pre></>}</div></PanelCard>;
}
