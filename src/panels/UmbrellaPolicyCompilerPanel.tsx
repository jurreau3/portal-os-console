// src/panels/UmbrellaPolicyCompilerPanel.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { UmbrellaRuleLive } from '../api/types';

export function UmbrellaPolicyCompilerPanel() {
  const [rules, setRules] = useState<UmbrellaRuleLive[]>([]);
  const [compileMessage, setCompileMessage] = useState<string | null>(null);

  useEffect(() => {
    api.umbrellaLive().then(setRules).catch(console.error);
  }, []);

  const compile = async (ruleText: string) => {
    const res = await api.umbrellaCompile(ruleText);
    setCompileMessage(res.message);
  };

  return (
    <div className="panel umbrella-compiler">
      <h2>Umbrella Live Rules</h2>
      <ul>
        {rules.map(r => (
          <li key={r.id}>
            {r.description} — {r.enabled ? 'enabled' : 'disabled'} — last:{' '}
            {r.lastResult}
          </li>
        ))}
      </ul>
      <button onClick={() => compile('example rule')}>
        Compile Example Rule
      </button>
      {compileMessage && <p>{compileMessage}</p>}
    </div>
  );
}
