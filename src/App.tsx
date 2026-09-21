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
import { Tabs } from './ui/Tabs';
import { ThemeToggle } from './ui/ThemeToggle';

export default function App() {
  const [tab, setTab] = useState('health');
  const tabs = [
    { id: 'health', label: 'Health' },
    { id: 'processes', label: 'Processes' },
    { id: 'identity', label: 'Identity' },
    { id: 'umbrella', label: 'Umbrella' },
    { id: 'sim', label: 'SIM' },
    { id: 'kernel', label: 'Kernel' },
    { id: 'windows', label: 'Windows' },
    { id: 'logs', label: 'Logs' },
  ];

  const panel = {
    health: <SystemHealthPanel />,
    processes: <ProcessTreePanel />,
    identity: <IdentityPanel />,
    umbrella: <UmbrellaPanel />,
    sim: <SimPanel />,
    kernel: <KernelPanel />,
    windows: <WindowsPanel />,
    logs: <LogsPanel />,
  }[tab as keyof typeof tabsById];

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
      <Tabs value={tab} onChange={setTab} tabs={tabs} />
      <div className="panel-grid">{panel}</div>
    </main>
  );
}

const tabsById = {
  health: true,
  processes: true,
  identity: true,
  umbrella: true,
  sim: true,
  kernel: true,
  windows: true,
  logs: true,
};
