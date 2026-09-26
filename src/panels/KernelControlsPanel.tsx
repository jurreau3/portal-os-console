// src/panels/KernelControlsPanel.tsx

import React from 'react';
import { api } from '../api/client';
import type { KernelCommandResponse } from '../api/types';

export function KernelControlsPanel() {
  const restartKernel = async (): Promise<KernelCommandResponse> => {
    return api.get('/kernel/restart') as Promise<KernelCommandResponse>;
  };

  const spawnProcess = async (name: string): Promise<KernelCommandResponse> => {
    return api.get(`/kernel/spawn/${encodeURIComponent(name)}` as any) as Promise<KernelCommandResponse>;
  };

  return (
    <div className="panel kernel-controls">
      <button
        onClick={() => {
          restartKernel().then(res => {
            console.log('Kernel restarted:', res.message);
          });
        }}
      >
        Restart Kernel
      </button>

      <button
        onClick={() => {
          spawnProcess('example').then(res => {
            console.log('Process spawned:', res.message);
          });
        }}
      >
        Spawn Process
      </button>
    </div>
  );
}
