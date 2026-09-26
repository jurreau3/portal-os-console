// src/ui/ProcessTree.tsx

import React from 'react';
import type { ProcessNode } from '../api/types';

interface ProcessTreeProps {
  root: ProcessNode;
}

export function ProcessTree({ root }: ProcessTreeProps) {
  return (
    <div className="process-tree">
      <ProcessNodeView node={root} />
    </div>
  );
}

function ProcessNodeView({ node }: { node: ProcessNode }) {
  return (
    <div className="process-node">
      <div className="process-node-header">
        <span className="process-name">{node.name}</span>
        <span className="process-pid">pid: {node.pid}</span>
        <span className="process-state">state: {node.state}</span>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="process-children">
          {node.children.map(child => (
            <ProcessNodeView key={child.pid} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
