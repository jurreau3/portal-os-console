import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { ProcessNode } from '../api/types';
import { ProcessTree } from '../ui/ProcessTree';
import { PanelCard } from '../ui/PanelCard';

export function ProcessTreePanel() {
  const [tree, setTree] = useState<ProcessNode[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    api.processTree()
      .then((value) => { if (active) setTree(value); })
      .catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : 'Request failed'); });
    return () => { active = false; };
  }, []);

  return (
    <PanelCard title="Process Tree">
      {error && <p className="error" role="alert">{error}</p>}
      {!tree && !error ? 'Loading…' : tree ? <ProcessTree nodes={tree} /> : 'No process data.'}
    </PanelCard>
  );
}
