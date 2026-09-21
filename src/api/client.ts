export const API_BASE = 'https://planetary-max.jurreaumax.workers.dev';

export type ApiRoute =
  | '/identity'
  | '/umbrella'
  | '/sim'
  | '/kernel'
  | '/windows'
  | '/bridge';

export type ApiResponse = Record<string, unknown>;

let bearerToken: string | undefined;

async function request<T extends ApiResponse>(route: ApiRoute): Promise<T> {
  const headers = new Headers({ Accept: 'application/json' });
  if (bearerToken) headers.set('Authorization', `Bearer ${bearerToken}`);

  const response = await fetch(`${API_BASE}${route}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

export const apiClient = {
  setBearerToken(token: string | undefined): void {
    bearerToken = token;
  },

  get<T extends ApiResponse = ApiResponse>(route: ApiRoute): Promise<T> {
    return request<T>(route);
  },

  identity: () => request('/identity'),
  umbrella: () => request('/umbrella'),
  sim: () => request('/sim'),
  kernel: () => request('/kernel'),
  windows: () => request('/windows'),
  bridge: () => request('/bridge'),
};
