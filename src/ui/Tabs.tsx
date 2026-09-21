import type { ChangeEvent } from 'react';

type Tab = { id: string; label: string };
type TabsProps = { tabs: Tab[]; value: string; onChange: (value: string) => void };

export function Tabs({ tabs, value, onChange }: TabsProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value);
  return <>
    <nav className="tabs" aria-label="Console sections">
      {tabs.map((tab) => <button key={tab.id} type="button" className={tab.id === value ? 'tab active' : 'tab'} aria-selected={tab.id === value} onClick={() => onChange(tab.id)}>{tab.label}</button>)}
    </nav>
    <select className="tabs-select" value={value} onChange={handleChange} aria-label="Console section">
      {tabs.map((tab) => <option key={tab.id} value={tab.id}>{tab.label}</option>)}
    </select>
  </>;
}
