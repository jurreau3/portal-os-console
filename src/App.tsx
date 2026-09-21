import './styles.css';
import { IdentityPanel } from './panels/IdentityPanel';
import { UmbrellaPanel } from './panels/UmbrellaPanel';
import { SimPanel } from './panels/SimPanel';
import { KernelPanel } from './panels/KernelPanel';
import { WindowsPanel } from './panels/WindowsPanel';
import { LogsPanel } from './panels/LogsPanel';

export default function App() {
  return <main className="shell">
    <header className="hero"><div><p className="eyebrow">PORTAL-OS / CONSOLE</p><h1>System surface</h1><p className="subtitle">A focused view into identity, runtime state, and kernel signals.</p></div><div className="status"><span className="status-dot" /> GUI ONLINE</div></header>
    <div className="panel-grid"><IdentityPanel /><UmbrellaPanel /><SimPanel /><KernelPanel /><WindowsPanel /><LogsPanel /></div>
  </main>;
}
