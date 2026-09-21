import { useEffect, useState } from 'react';
import { API_BASE } from './client';

type SSEState<T> = { data: T | null; error: string | null; connected: boolean; online: boolean };

/** Subscribe to a named event from the Worker /events SSE endpoint. */
export function useSSE<T>(event: string, enabled = true): SSEState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    const source = new EventSource(`${API_BASE}/events?event=${encodeURIComponent(event)}`);
    source.onopen = () => { setConnected(true); setError(null); };
    source.onmessage = (message) => {
      try { setData(JSON.parse(message.data) as T); setError(null); }
      catch { setError('Received an invalid SSE payload'); }
    };
    source.onerror = () => { setConnected(false); setError('SSE connection lost; retrying…'); };
    return () => { source.close(); setConnected(false); };
  }, [event, enabled]);

  return { data, error, connected, online: connected };
}
