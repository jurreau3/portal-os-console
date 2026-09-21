import { useEffect, useState } from 'react';
import { api } from './client';
import { useSSE } from './useSSE';
import type { SystemHealth } from './types';

const initialHealth: SystemHealth = {
  identity: null,
  umbrella: null,
  sim: null,
  kernel: null,
  sseOnline: false,
  latencyMs: null,
};

export function useSystemHealth(): SystemHealth {
  const [health, setHealth] = useState<SystemHealth>(initialHealth);
  const kernelSSE = useSSE('/kernel');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const start = performance.now();
      try {
        const [identity, umbrella, sim, kernel] = await Promise.all([
          api.identity(),
          api.umbrella(),
          api.sim(),
          api.kernel(),
        ]);
        if (!cancelled) {
          setHealth({
            identity,
            umbrella,
            sim,
            kernel,
            sseOnline: kernelSSE.online,
            latencyMs: Math.round(performance.now() - start),
          });
        }
      } catch {
        if (!cancelled) {
          setHealth((current) => ({
            ...current,
            sseOnline: kernelSSE.online,
            latencyMs: Math.round(performance.now() - start),
          }));
        }
      }
    };

    void load();
    const interval = window.setInterval(() => void load(), 5000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [kernelSSE.online]);

  return health;
}
