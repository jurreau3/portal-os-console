import { useState } from 'react';
import './styles.css';
import { IdentityPanel } from './panels/IdentityPanel';
import { UmbrellaPanel } from './panels/UmbrellaPanel';
import { SimPanel } from './panels/SimPanel';
import { KernelPanel } from './panels/KernelPanel';
import { WindowsPanel } from './panels/WindowsPanel';
import { LogsPanel } from './panels/LogsPanel';
import { SystemHealthPanel } from './panels/SystemHealthPanel';
import { ProcessTreePanel } from './panels/ProcessTreePanel';
import { WindowManagerPanel } from './panels/WindowManagerPanel';
import { SimAgentViewerPanel } from './panels/SimAgentViewerPanel';
import { UmbrellaRuleEditorPanel } from './panels/UmbrellaRuleEditorPanel';
import { KernelControlsPanel } from './panels/KernelControlsPanel';
import { Tabs } from './ui/Tabs';
import { ThemeToggle } from './ui/ThemeToggle';

const panels = {
  health: <SystemHealthPanel />,
  processes: <ProcessTreePanel />,
  windows: <WindowManagerPanel />,
  agents: <SimAgentViewerPanel />,
  umbrellaEditor: <UmbrellaRuleEditorPanel />,
  kernelControls: <KernelControlsPanel />,
  identity: <IdentityPanel />,
  umbrella: <UmbrellaPanel />,
  sim: <SimPanel />,
  kernel: <KernelPanel />,
  windowsApi: <WindowsPanel />,
  logs: <LogsPanel />,
};

type PanelId = keyof typeof panels;

const tabs: { id: PanelId; label: string }[] = [
  { id: 'health', label: 'Health' },
  { id: 'processes', label: 'Processes' },
  { id: 'windows', label: 'Window Manager' },
  { id: 'agents', label: 'SIM Agents' },
  { id: 'umbrellaEditor', label: 'Umbrella Rules' },
  { id: 'kernelControls', label: 'Kernel Controls' },
  { id: 'identity', label: 'Identity' },
  { id: 'umbrella', label: 'Umbrella' },
  { id: 'sim', label: 'SIM' },
  { id: 'kernel', label: 'Kernel' },
  { id: 'windowsApi', label: 'Windows API' },
  { id: 'logs', label: 'Logs' },
];

export default function App() {
  const [tab, setTab] = useState<PanelId>('health');

  return (
    <main className="shell">
      <ThemeToggle />
      <header className="hero">
        <div>
          <p className="eyebrow">PORTAL-OS / CONSOLE</p>
          <h1>System surface</h1>
          <p className="subtitle">A focused view into identity, runtime state, and kernel signals.</p>
        </div>
        <div className="status"><span className="status-dot" /> GUI ONLINE</div>
      </header>
      <Tabs value={tab} onChange={(value) => setTab(value as PanelId)} tabs={tabs} />
      <div className="panel-grid">{panels[tab]}</div>
    </main>
  );
}
