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
import { WindowLayoutVisualizerPanel } from './panels/WindowLayoutVisualizerPanel';
import { SimAgentLiveMapPanel } from './panels/SimAgentLiveMapPanel';
import { UmbrellaPolicyCompilerPanel } from './panels/UmbrellaPolicyCompilerPanel';
import { KernelTimelinePanel } from './panels/KernelTimelinePanel';
import { IdentitySessionInspectorPanel } from './panels/IdentitySessionInspectorPanel';
import { KernelHeatmapPanel } from './panels/kernel-heatmap';
import { Tabs } from './ui/Tabs';
import { ThemeToggle } from './ui/ThemeToggle';
import { ConsoleFrame } from './ui/console-frame';

const panels = {
  health: <SystemHealthPanel />, processes: <ProcessTreePanel />, windows: <WindowManagerPanel />, agents: <SimAgentViewerPanel />,
  umbrellaEditor: <UmbrellaRuleEditorPanel />, kernelControls: <KernelControlsPanel />, kernelHeatmap: <KernelHeatmapPanel />,
  windowLayout: <WindowLayoutVisualizerPanel />, simLiveMap: <SimAgentLiveMapPanel />, umbrellaCompiler: <UmbrellaPolicyCompilerPanel />,
  kernelTimeline: <KernelTimelinePanel />, identityInspector: <IdentitySessionInspectorPanel />, beMaxPortal: <ConsoleFrame />,
  identity: <IdentityPanel />, umbrella: <UmbrellaPanel />, sim: <SimPanel />, kernel: <KernelPanel />, windowsApi: <WindowsPanel />, logs: <LogsPanel />,
};

type PanelId = keyof typeof panels;
const tabs: { id: PanelId; label: string }[] = [
  { id: 'health', label: 'Health' }, { id: 'processes', label: 'Processes' }, { id: 'windows', label: 'Window Manager' },
  { id: 'agents', label: 'SIM Agents' }, { id: 'umbrellaEditor', label: 'Umbrella Rules' }, { id: 'kernelControls', label: 'Kernel Controls' },
  { id: 'kernelHeatmap', label: 'Kernel Heatmap' }, { id: 'windowLayout', label: 'Live Window Layout' }, { id: 'simLiveMap', label: 'Live SIM Map' },
  { id: 'umbrellaCompiler', label: 'Policy Compiler' }, { id: 'kernelTimeline', label: 'Kernel Timeline' }, { id: 'identityInspector', label: 'Identity Sessions' },
  { id: 'beMaxPortal', label: 'BE-MAX Portal' }, { id: 'identity', label: 'Identity' }, { id: 'umbrella', label: 'Umbrella' },
  { id: 'sim', label: 'SIM' }, { id: 'kernel', label: 'Kernel' }, { id: 'windowsApi', label: 'Windows API' }, { id: 'logs', label: 'Logs' },
];

export default function App() {
  const [tab, setTab] = useState<PanelId>('beMaxPortal');
  return <main className="shell">
    <ThemeToggle />
    <header className="hero"><div><p className="eyebrow">PORTAL-OS / CONSOLE</p><h1>System surface</h1><p className="subtitle">A focused view into identity, runtime state, and kernel signals.</p></div></header>
    <Tabs value={tab} onChange={(value) => setTab(value as PanelId)} tabs={tabs} />
    <div className="panel-grid">{panels[tab]}</div>
  </main>;
}
