// src/panels/ProcessTreePanel.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { ProcessNode } from '../api/types';
import { ProcessTree } from '../ui/ProcessTree';

export function ProcessTreePanel() {
  const [root, setRoot] = useState<ProcessNode | null>(null);

  useEffect(() => {
    api.processTree().then(nodes => {
      // pick the first node as root
      setRoot(nodes[0]);
    });
  }, []);

  if (!root) return <div>Loading process tree…</div>;

  return (
    <div className="panel process-tree">
      <h2>Process Tree</h2>
      <ProcessTree root={root} />
    </div>
  );
}
