import { useEffect, useMemo, useState } from 'react';
import { PanelCard } from '../../ui/PanelCard';
import { fetchFocus } from './api';
import { arrangeNodes } from './logic';
import type { FocusEvent, PanelState } from './types';
import './style.css';
export function WindowFocusGraphPanel() { const [state, setState] = useState<PanelState<FocusEvent[]>>({ loading: true }); useEffect(() => { fetchFocus().then((data) => setState({ loading: false, data })).catch((e) => setState({ loading: false, error: e instanceof Error ? e.message : 'Request failed' })); }, []); const nodes = useMemo(() => arrangeNodes(state.data ?? []), [state.data]); return <PanelCard title="Window Focus Graph"><div className="focus-graph">{state.loading && 'Loading…'}{state.error && <p className="error">{state.error}</p>}{state.data && nodes.map((node) => <div className={node.focused ? 'focus-node focused' : 'focus-node'} key={node.id} style={{ left: `${node.x}%`, top: `${node.y}%` }}><span>{node.title}</span><small>z{node.z}</small></div>)}</div></PanelCard>; }
