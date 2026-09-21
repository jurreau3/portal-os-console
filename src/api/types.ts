export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export interface ApiRecord {
  [key: string]: JsonValue;
}

export interface IdentityResponse extends ApiRecord {
  id?: string;
  name?: string;
  status?: string;
}

export interface UmbrellaResponse extends ApiRecord {
  status?: string;
  mode?: string;
}

export interface SimResponse extends ApiRecord {
  status?: string;
  state?: string;
}

export interface KernelResponse extends ApiRecord {
  status?: string;
  version?: string;
}

export interface WindowsResponse extends ApiRecord {
  status?: string;
  count?: number;
}

export interface LogsResponse extends ApiRecord {
  logs?: JsonValue[];
  entries?: JsonValue[];
  timestamp?: string;
}

export interface ApiResponseMap {
  '/identity': IdentityResponse;
  '/umbrella': UmbrellaResponse;
  '/sim': SimResponse;
  '/kernel': KernelResponse;
  '/windows': WindowsResponse;
  '/bridge': LogsResponse;
}

export type ApiRoute = keyof ApiResponseMap;
