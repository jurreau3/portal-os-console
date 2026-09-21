import type { ApiResponseMap, ApiRoute } from './types';

export const API_BASE = 'https://planetary-max.jurreaumax.workers.dev';

let bearerToken: string | undefined;

async function request<Route extends ApiRoute>(route: Route): Promise<ApiResponseMap[Route]> {
  const headers = new Headers({ Accept: 'application/json' });
  if (bearerToken) headers.set('Authorization', `Bearer ${bearerToken}`);

  const response = await fetch(`${API_BASE}${route}`, { method: 'GET', headers });
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
};

// Short alias for panels and hooks that use the API as a namespace.
export const api = apiClient;
