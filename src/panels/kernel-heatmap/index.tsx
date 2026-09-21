import { useEffect, useMemo, useState } from 'react';
import { PanelCard } from '../../ui/PanelCard';
import { fetchHeatmap } from './api';
import { toCells } from './logic';
import type { HeatPoint, PanelState } from './types';
import './style.css';

export function KernelHeatmapPanel() {
  const [state, setState] = useState<PanelState<HeatPoint[]>>({ loading: true });

  useEffect(() => {
    let active = true;
    fetchHeatmap()
      .then((data) => { if (active) setState({ loading: false, data }); })
      .catch((cause) => {
        if (active) setState({ loading: false, error: cause instanceof Error ? cause.message : 'Request failed' });
      });
    return () => { active = false; };
  }, []);

  const cells = useMemo(() => toCells(state.data ?? []), [state.data]);
  const maxPressure = useMemo(() => Math.max(...cells.map((cell) => cell.pressure), 1), [cells]);

  return (
    <PanelCard title="Kernel Heatmap" eyebrow="/api/kernel/heatmap">
      {state.loading && <p>Loading kernel pressure…</p>}
      {state.error && <p className="error" role="alert">{state.error}</p>}
      {state.data && (
        <div className="heatmap-content">
          <div className="heatmap-summary">{cells.length} process samples · peak pressure {maxPressure}</div>
          {cells.length === 0 ? <p>No kernel samples available.</p> : (
            <div className="heatmap" role="list" aria-label="Kernel process pressure heatmap">
              {cells.map((cell) => (
                <div
                  className="heat-cell"
                  key={cell.key}
                  role="listitem"
                  title={`${cell.process}: density ${cell.density}, pressure ${cell.pressure}${cell.event ? `, ${cell.event}` : ''}`}
                  style={{ '--heat': String(cell.normalizedPressure) } as React.CSSProperties}
                >
                  <strong>{cell.process}</strong>
                  <span>{cell.pressure}</span>
                </div>
              ))}
            </div>
          )}
          <pre className="payload">{JSON.stringify(state.data, null, 2)}</pre>
        </div>
      )}
    </PanelCard>
  );
}
