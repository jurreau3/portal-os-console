// src/api/client.ts

import type {
  ApiResponseMap,
  ApiRoute,
  WindowInfo,
  SystemHealth,
  PlanetaryState,
  Phase11State,
  MaxOSVersionInfo,
  StateSnapshot,
  IdentitySession,
  KernelEvent,
  SimAgentLive,
  UmbrellaRuleLive,
  WindowLayout,
} from './types';

export const API_BASE =
  import.meta.env.VITE_API_BASE ?? 'http://localhost:8787';

let bearerToken: string | undefined;
type RequestOptions = { method?: 'GET' | 'POST'; body?: string };

async function request<Route extends ApiRoute>(
  route: Route,
  options: RequestOptions = {}
): Promise<ApiResponseMap[Route]> {
  const headers = new Headers({ Accept: 'application/json' });
  if (options.body) headers.set('Content-Type', 'application/json');
  if (bearerToken) headers.set('Authorization', `Bearer ${bearerToken}`);

  const response = await fetch(`${API_BASE}${route}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body,
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

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
  identitySession: (): Promise<IdentitySession> =>
    request('/identity/session'),

  umbrella: () => request('/umbrella'),
  umbrellaRules: () => request('/umbrella/rules'),
  umbrellaCompile: (rule: string) =>
    request('/umbrella/compile', {
      method: 'POST',
      body: JSON.stringify({ rule }),
    }),
  umbrellaLive: (): Promise<UmbrellaRuleLive[]> =>
    request('/umbrella/live'),

  sim: () => request('/sim'),
  simAgents: () => request('/sim/agents'),
  simLive: (): Promise<SimAgentLive[]> => request('/sim/live'),

  kernel: () => request('/kernel'),
  kernelRestart: () =>
    request('/kernel/restart', { method: 'POST' }),
  kernelKillProcess: (pid: string) =>
    request(`/kernel/kill/${encodeURIComponent(pid)}` as ApiRoute, {
      method: 'POST',
    }),
  kernelSpawnProcess: (name: string) =>
    request(`/kernel/spawn/${encodeURIComponent(name)}` as ApiRoute, {
      method: 'POST',
    }),
  kernelEvents: (): Promise<KernelEvent[]> =>
    request('/kernel/events'),
  kernelTimeline: (): Promise<KernelEvent[]> =>
    request('/kernel/timeline'),

  windows: () => request('/windows'),
  windowsList: (): Promise<WindowInfo[]> =>
    request('/windows').then(r => r.windows),
  windowLayout: (): Promise<WindowLayout> =>
    request('/windows/layout'),

  bridge: () => request('/bridge'),
  processTree: () => request('/process-tree'),

  planetary: (): Promise<PlanetaryState> => request('/planetary'),
  planetaryToggle: () =>
    request('/planetary/toggle', { method: 'POST' }),

  systemState: (): Promise<StateSnapshot> => request('/state'),

  maxOSVersion: (): Promise<MaxOSVersionInfo> =>
    request('/maxos-version'),
  phase11: (): Promise<Phase11State> => request('/phase11'),
};

export const api = apiClient;
