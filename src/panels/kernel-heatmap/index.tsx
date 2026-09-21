import { useEffect, useMemo, useState } from 'react';
import { PanelCard } from '../../ui/PanelCard';
import { fetchHeatmap } from './api';
import { toCells } from './logic';
import type { HeatPoint, PanelState } from './types';
import './style.css';
export function KernelHeatmapPanel() { const [state, setState] = useState<PanelState<HeatPoint[]>>({ loading: true }); useEffect(() => { fetchHeatmap().then((data) => setState({ loading: false, data })).catch((e) => setState({ loading: false, error: e instanceof Error ? e.message : 'Request failed' })); }, []); const cells = useMemo(() => toCells(state.data ?? []), [state.data]); return <PanelCard title="Kernel Heatmap"><div className="advanced-panel">{state.loading && 'Loading…'}{state.error && <p className="error">{state.error}</p>}{state.data && <><div className="heatmap">{cells.map((cell) => <span key={cell.key} title={`${cell.process}: ${cell.pressure}`} style={{ backgroundColor: `rgba(255, ${Math.max(40, 220 - cell.pressure * 2)}, 80, ${Math.min(1, .2 + cell.pressure / 100)})` }} />)}</div><pre className="payload">{JSON.stringify(state.data, null, 2)}</pre></>}</div></PanelCard>; }
