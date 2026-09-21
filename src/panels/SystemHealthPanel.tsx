import { PanelCard } from '../ui/PanelCard';
import { useSystemHealth } from '../api/useSystemHealth';

export function SystemHealthPanel() {
  const health = useSystemHealth();

  return (
    <PanelCard title="System Health">
      <pre className="payload">{JSON.stringify(health, null, 2)}</pre>
    </PanelCard>
  );
}
