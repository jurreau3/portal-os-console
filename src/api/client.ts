import type { ApiResponseMap, ApiRoute, WindowInfo } from './types';

export const API_BASE = 'https://planetary-max.maxchaz1.workers.dev/api';

let bearerToken: string | undefined;
type RequestOptions = { method?: 'GET' | 'POST'; body?: string };

async function request<Route extends ApiRoute>(route: Route, options: RequestOptions = {}): Promise<ApiResponseMap[Route]> {
  const headers = new Headers({ Accept: 'application/json' });
  if (options.body) headers.set('Content-Type', 'application/json');
  if (bearerToken) headers.set('Authorization', `Bearer ${bearerToken}`);

  const response = await fetch(`${API_BASE}${route}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body,
  });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  return (await response.json()) as ApiResponseMap[Route];
}

export const apiClient = {
  setBearerToken(token: string | undefined): void {
    bearerToken = token;
  },
  get<Route extends ApiRoute>(route: Route): Promise<ApiResponseMap[Route]> {
    return request(route);
  },
  identity: () => request('/identity'),
  umbrella: () => request('/umbrella'),
  sim: () => request('/sim'),
  kernel: () => request('/kernel'),
  windows: () => request('/windows'),
  bridge: () => request('/bridge'),
  processTree: () => request('/process-tree'),
  windowsList: (): Promise<WindowInfo[]> => request('/windows' as ApiRoute) as Promise<WindowInfo[]>,
  simAgents: () => request('/sim/agents'),
  umbrellaRules: () => request('/umbrella/rules'),
  toggleUmbrellaRule: (id: string) => request('/umbrella/rules/:id/toggle'.replace(':id', encodeURIComponent(id)) as '/umbrella/rules/:id/toggle', { method: 'POST' }),
  umbrellaCompile: (rule: string) => request('/umbrella/compile', { method: 'POST', body: JSON.stringify({ rule }) }),
  kernelRestart: () => request('/kernel/restart', { method: 'POST' }),
  kernelKillProcess: (pid: string) => request('/kernel/kill/:pid'.replace(':pid', encodeURIComponent(pid)) as '/kernel/kill/:pid', { method: 'POST' }),
  kernelSpawnProcess: (name: string) => request('/kernel/spawn/:name'.replace(':name', encodeURIComponent(name)) as '/kernel/spawn/:name', { method: 'POST' }),
};

export const api = apiClient;
