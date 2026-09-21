import { useCallback, useEffect, useState } from 'react';
import type { UmbrellaRule } from '../api/types';
import { api } from '../api/client';
import { PanelCard } from '../ui/PanelCard';

export function UmbrellaRuleEditorPanel() {
  const [rules, setRules] = useState<UmbrellaRule[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setRules(await api.umbrellaRules());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Request failed');
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const toggle = async (id: string) => {
    try {
      setBusyId(id);
      setError(null);
      await api.toggleUmbrellaRule(id);
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Request failed');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <PanelCard title="Umbrella Rule Editor">
      {error && <p className="error" role="alert">{error}</p>}
      {!rules && !error ? 'Loading…' : rules ? (
        <div className="rule-list">
          {rules.map((rule) => (
            <div className="rule-row" key={rule.id}>
              <div><strong>{rule.description}</strong><span className="rule-id">{rule.id}</span></div>
              <span className={rule.enabled ? 'rule-enabled' : 'rule-disabled'}>{rule.enabled ? 'Enabled' : 'Disabled'}</span>
              <button type="button" onClick={() => void toggle(rule.id)} disabled={busyId === rule.id}>{busyId === rule.id ? 'Saving…' : 'Toggle'}</button>
            </div>
          ))}
        </div>
      ) : 'No rules available.'}
    </PanelCard>
  );
}
