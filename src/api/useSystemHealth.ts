// src/api/useSystemHealth.ts

import { useEffect, useState } from 'react';
import { api } from './client';
import type { SystemHealth } from './types';

export function useSystemHealth() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchHealth() {
      setLoading(true);
      setError(null);
      try {
        // Derive health from system state snapshot
        const snapshot = await api.systemState();
        if (cancelled) return;

        const current: SystemHealth = {
          kernelOk: snapshot.kernel.processes.length > 0,
          simOk: snapshot.sim.agents.length > 0,
          umbrellaOk: snapshot.umbrella.rules.length > 0,
          identityOk: !!snapshot.identity.id,
          planetaryOk: !!snapshot.planetary.mode,
          lastCheckedAt: Date.now(),
        };

        setHealth(current);
      } catch (e) {
        if (cancelled) return;
        setError(
          e instanceof Error ? e.message : 'Failed to fetch system health',
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchHealth();

    return () => {
      cancelled = true;
    };
  }, []);

  return { health, loading, error };
}
