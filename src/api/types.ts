// src/api/types.ts

export interface IdentityResponse {
  id: string;
  name: string;
  roles: string[];
}

export interface UmbrellaRule {
  id: string;
  description: string;
  enabled: boolean;
}

export interface UmbrellaResponse {
  rules: UmbrellaRule[];
}

export interface UmbrellaCompileResponse {
  ok: boolean;
  message: string;
}

export interface SimAgent {
  id: string;
  state: string;
}

export interface SimResponse {
  agents: SimAgent[];
}

export interface KernelCommandResponse {
  ok: boolean;
  message: string;
}

export interface ProcessNode {
  pid: string;
  name: string;
  children?: ProcessNode[];
}

export interface KernelResponse {
  processes: ProcessNode[];
}

export interface WindowInfo {
  id: string;
  title: string;
  state: string;
}

export interface WindowsResponse {
  windows: WindowInfo[];
}

export interface BridgeResponse {
  status: string;
}

export interface PlanetaryToggleResponse {
  mode: string;
}

export type ApiRoute =
  | '/identity'
  | '/umbrella'
  | '/umbrella/rules'
  | '/umbrella/compile'
  | '/sim'
  | '/sim/agents'
  | '/kernel'
  | '/kernel/restart'
  | '/kernel/spawn'
  | '/kernel/kill/:pid'
  | '/windows'
  | '/bridge'
  | '/process-tree'
  | '/planetary/toggle';

export interface ApiResponseMap {
  '/identity': IdentityResponse;
  '/umbrella': UmbrellaResponse;
  '/umbrella/rules': UmbrellaRule[];
  '/umbrella/compile': UmbrellaCompileResponse;
  '/sim': SimResponse;
  '/sim/agents': SimAgent[];
  '/kernel': KernelResponse;
  '/kernel/restart': KernelCommandResponse;
  '/kernel/spawn': KernelCommandResponse;
  '/kernel/kill/:pid': KernelCommandResponse;
  '/windows': WindowsResponse;
  '/bridge': BridgeResponse;
  '/process-tree': ProcessNode[];
  '/planetary/toggle': PlanetaryToggleResponse;
}
