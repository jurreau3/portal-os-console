import { useState } from 'react';
import './styles.css';
import { IdentityPanel } from './panels/IdentityPanel';
import { UmbrellaPanel } from './panels/UmbrellaPanel';
import { SimPanel } from './panels/SimPanel';
import { KernelPanel } from './panels/KernelPanel';
import { WindowsPanel } from './panels/WindowsPanel';
import { LogsPanel } from './panels/LogsPanel';
import { Tabs } from './ui/Tabs';

export default function App() {
  const [tab, setTab] = useState('overview');
  return <main className="shell">
    <header className="hero"><div><p className="eyebrow">PORTAL-OS / CONSOLE</p><h1>System surface</h1><p className="subtitle">A focused view into identity, runtime state, and kernel signals.</p></div><div className="status"><span className="status-dot" /> GUI ONLINE</div></header>
    <Tabs value={tab} onChange={setTab} tabs={[{ id: 'overview', label: 'Overview' }, { id: 'streams', label: 'Live streams' }]} />
    <div className="panel-grid">{tab === 'overview' ? <><IdentityPanel /><UmbrellaPanel /><SimPanel /><WindowsPanel /></> : <><KernelPanel /><LogsPanel /></>}</div>
  </main>;
}
