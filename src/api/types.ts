export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue | undefined };
export interface ApiRecord { [key: string]: JsonValue | undefined; }
export interface IdentityResponse extends ApiRecord { id?: string; name?: string; status?: string; }
export interface UmbrellaResponse extends ApiRecord { status?: string; mode?: string; }
export interface SimResponse extends ApiRecord { status?: string; state?: string; }
export interface KernelResponse extends ApiRecord { status?: string; version?: string; }
export interface WindowsResponse extends ApiRecord { status?: string; count?: number; }
export interface LogsResponse extends ApiRecord { logs?: JsonValue[]; entries?: JsonValue[]; timestamp?: string; }
export interface ProcessNode { pid: string; name: string; state: 'running' | 'sleeping' | 'blocked'; children: ProcessNode[]; }
export interface SystemHealth { identity: IdentityResponse | null; umbrella: UmbrellaResponse | null; sim: SimResponse | null; kernel: KernelResponse | null; sseOnline: boolean; latencyMs: number | null; }
export interface WindowInfo { id: string; title: string; state: 'open' | 'closed' | 'minimized'; z: number; }
export interface WindowLayout { id: string; title: string; x: number; y: number; width: number; height: number; z: number; focused: boolean; }
export interface SimAgent { id: string; type: string; state: string; tick: number; }
export interface SimAgentLive { id: string; type: string; state: string; x: number; y: number; vx: number; vy: number; tick: number; }
export interface UmbrellaRule { id: string; description: string; enabled: boolean; }
export interface UmbrellaRuleLive { id: string; description: string; enabled: boolean; compiled: boolean; }
export interface UmbrellaCompileResult { ok: boolean; errors: string[]; preview: string; }
export interface KernelCommandResponse extends ApiRecord { ok: boolean; message: string; }
export interface KernelEvent { id: string; type: 'spawn' | 'kill' | 'restart' | 'crash' | 'transition' | string; pid?: string; processName?: string; timestamp: string; details?: string; }
export interface IdentitySession { id: string; mode: string; token: string; issuedAt: string; expiresAt: string; chain: string[]; }

export interface ApiResponseMap {
  '/identity': IdentityResponse; '/umbrella': UmbrellaResponse; '/sim': SimResponse; '/kernel': KernelResponse;
  '/windows': WindowInfo[] | WindowsResponse; '/bridge': LogsResponse; '/process-tree': ProcessNode[]; '/sim/agents': SimAgent[];
  '/umbrella/rules': UmbrellaRule[]; '/umbrella/rules/:id/toggle': UmbrellaRule; '/umbrella/compile': UmbrellaCompileResult;
  '/kernel/restart': KernelCommandResponse; '/kernel/kill/:pid': KernelCommandResponse; '/kernel/spawn/:name': KernelCommandResponse;
  '/state': ApiRecord; '/phase11': ApiRecord; '/planetary': ApiRecord; '/maxos-version': ApiRecord; '/planetary/toggle': KernelCommandResponse;
}
export type ApiRoute = keyof ApiResponseMap;
