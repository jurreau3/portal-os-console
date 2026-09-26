// src/panels/KernelControlsPanel.tsx

import React from 'react';
import { api } from '../api/client';
import type { KernelCommandResponse } from '../api/types';

export function KernelControlsPanel() {
  const restartKernel = async (): Promise<KernelCommandResponse> => {
    return api.kernelRestart();
  };

  const spawnProcess = async (name: string): Promise<KernelCommandResponse> => {
    return api.kernelSpawnProcess(name);
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
