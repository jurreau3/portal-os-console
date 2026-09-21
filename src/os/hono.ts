export type PortalRoute = {
  method: 'GET' | 'POST';
  path: string;
  handler: (input?: Record<string, unknown>) => Promise<Record<string, unknown>>;
};

export function createPortalRoutes() {
  const routes: PortalRoute[] = [
    {
      method: 'GET',
      path: '/portal/state',
      handler: async () => ({ state: 'idle', intensity: 0.6, ok: true }),
    },
    {
      method: 'POST',
      path: '/portal/update',
      handler: async (input = {}) => ({ ok: true, payload: input }),
    },
  ];

  return routes;
}
