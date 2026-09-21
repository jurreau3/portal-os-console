export type ApiRoute =
  | '/identity'
  | '/umbrella'
  | '/sim'
  | '/kernel'
  | '/windows'
  | '/autonomy'
  | '/universe'
  | '/bridge';

export type ApiResponse = Record<string, unknown>;

let bearerToken: string | undefined;

export const apiClient = {
  setBearerToken(token: string | undefined): void {
    bearerToken = token;
  },

  async get<T extends ApiResponse>(route: ApiRoute): Promise<T> {
    const headers = new Headers({ Accept: 'application/json' });
    if (bearerToken) headers.set('Authorization', `Bearer ${bearerToken}`);

    const response = await fetch(route, { method: 'GET', headers });
    if (!response.ok) throw new Error(`API request failed (${response.status})`);
    return (await response.json()) as T;
  },
};
