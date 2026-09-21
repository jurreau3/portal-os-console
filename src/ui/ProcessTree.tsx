import { useState } from 'react';
import type { ProcessNode } from '../api/types';

export function ProcessTree({ nodes }: { nodes: ProcessNode[] }) {
  return (
    <div className="process-tree">
      {nodes.map((node) => <ProcessNodeView key={node.pid} node={node} />)}
    </div>
  );
}

function ProcessNodeView({ node }: { node: ProcessNode }) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children.length > 0;

  return (
    <div className="process-node">
      <button
        type="button"
        className="process-header"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={hasChildren ? open : undefined}
      >
        <span className={`state-${node.state}`} aria-hidden="true">●</span>{' '}
        <strong>{node.name}</strong> <span>(PID {node.pid})</span>
        {hasChildren && <span className="process-chevron" aria-hidden="true">{open ? '⌄' : '›'}</span>}
      </button>
      {open && hasChildren && (
        <div className="process-children">
          {node.children.map((child) => <ProcessNodeView key={child.pid} node={child} />)}
        </div>
      )}
    </div>
  );
}
