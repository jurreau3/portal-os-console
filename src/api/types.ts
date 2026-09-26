// src/api/types.ts

export interface IdentityResponse {
  id: string;
  name: string;
  roles: string[];
}

export interface IdentitySession {
  sessionId: string;
  userId: string;
  issuedAt: number;
  expiresAt: number;
  ipAddress?: string;
  userAgent?: string;
}

export interface UmbrellaRule {
  id: string;
  description: string;
  enabled: boolean;
}

export interface UmbrellaRuleLive extends UmbrellaRule {
  lastEvaluatedAt: number;
  lastResult: 'allow' | 'deny';
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

export interface SimAgentLive extends SimAgent {
  x: number;
  y: number;
  lastUpdatedAt: number;
}

export interface SimResponse {
  agents: SimAgent[];
}

export interface KernelCommandResponse {
  ok: boolean;
  message: string;
}

export interface KernelEvent {
  id: string;
  type: string;
  pid?: string;
  timestamp: number;
  details?: string;
}

export interface ProcessNode {
  pid: string;
  name: string;
  state: string;
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

export interface WindowLayout {
  windows: WindowInfo[];
  layoutId: string;
  updatedAt: number;
}

export interface WindowsResponse {
  windows: WindowInfo[];
}

export interface BridgeResponse {
  status: string;
}

export interface PlanetaryState {
  mode: string;
  enforcement: string;
  phase: string;
}

export interface PlanetaryToggleResponse {
  mode: string;
  message: string;
}

export interface SystemHealth {
  kernelOk: boolean;
  simOk: boolean;
  umbrellaOk: boolean;
  identityOk: boolean;
  planetaryOk: boolean;
  lastCheckedAt: number;
}

export interface StateSnapshot {
  kernel: KernelResponse;
  sim: SimResponse;
  umbrella: UmbrellaResponse;
  identity: IdentityResponse;
  planetary: PlanetaryState;
  windows: WindowsResponse;
}

export interface MaxOSVersionInfo {
  version: string;
  build: string;
  phase: string;
}

export interface Phase11State {
  active: boolean;
  level: string;
  description?: string;
}

export type ApiRoute =
  | '/identity'
  | '/identity/session'
  | '/umbrella'
  | '/umbrella/rules'
  | '/umbrella/compile'
  | '/umbrella/live'
  | '/sim'
  | '/sim/agents'
  | '/sim/live'
  | '/kernel'
  | '/kernel/restart'
  | '/kernel/spawn'
  | '/kernel/kill/:pid'
  | '/kernel/events'
  | '/kernel/timeline'
  | '/windows'
  | '/windows/layout'
  | '/bridge'
  | '/process-tree'
  | '/planetary'
  | '/planetary/toggle'
  | '/state'
  | '/maxos-version'
  | '/phase11';

export interface ApiResponseMap {
  '/identity': IdentityResponse;
  '/identity/session': IdentitySession;
  '/umbrella': UmbrellaResponse;
  '/umbrella/rules': UmbrellaRule[];
  '/umbrella/compile': UmbrellaCompileResponse;
  '/umbrella/live': UmbrellaRuleLive[];
  '/sim': SimResponse;
  '/sim/agents': SimAgent[];
  '/sim/live': SimAgentLive[];
  '/kernel': KernelResponse;
  '/kernel/restart': KernelCommandResponse;
  '/kernel/spawn': KernelCommandResponse;
  '/kernel/kill/:pid': KernelCommandResponse;
  '/kernel/events': KernelEvent[];
  '/kernel/timeline': KernelEvent[];
  '/windows': WindowsResponse;
  '/windows/layout': WindowLayout;
  '/bridge': BridgeResponse;
  '/process-tree': ProcessNode[];
  '/planetary': PlanetaryState;
  '/planetary/toggle': PlanetaryToggleResponse;
  '/state': StateSnapshot;
  '/maxos-version': MaxOSVersionInfo;
  '/phase11': Phase11State;
}
