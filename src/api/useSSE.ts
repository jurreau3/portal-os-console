import { useEffect, useState } from 'react';
import { API_BASE } from './client';
import type { ApiResponseMap, ApiRoute } from './types';

type SSEValue<Route extends ApiRoute> = ApiResponseMap[Route];

type UseSSEOptions = { enabled?: boolean };

type SSEState<Route extends ApiRoute> = {
  data: SSEValue<Route> | null;
  error: string | null;
  connected: boolean;
  online: boolean;
};

export function useSSE<Route extends ApiRoute>(
  route: Route,
  options: UseSSEOptions = {},
): SSEState<Route> {
  const { enabled = true } = options;
  const [data, setData] = useState<SSEValue<Route> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;

    const source = new EventSource(`${API_BASE}${route}`, { withCredentials: false });
    source.onopen = () => {
      setConnected(true);
      setError(null);
    };
    source.onmessage = (event) => {
      try {
        setData(JSON.parse(event.data) as SSEValue<Route>);
        setError(null);
      } catch {
        setError('Received an invalid SSE payload');
      }
    };
    source.onerror = () => {
      setConnected(false);
      setError('SSE connection lost; retrying…');
    };

    return () => {
      source.close();
      setConnected(false);
    };
  }, [enabled, route]);

  return { data, error, connected, online: connected };
}
