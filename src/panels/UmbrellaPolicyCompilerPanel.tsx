import { useState } from 'react';
import { PanelCard } from '../ui/PanelCard';
import { useSSE } from '../api/useSSE';
import type { UmbrellaRuleLive } from '../api/types';
import { api } from '../api/client';

export function UmbrellaPolicyCompilerPanel() {
  const { data, online } = useSSE<UmbrellaRuleLive[]>('umbrella-rules');
  const [source, setSource] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [compiling, setCompiling] = useState(false);

  const compile = async () => {
    try {
      setCompiling(true); setError(null);
      const response = await api.umbrellaCompile(source);
      setResult(JSON.stringify(response, null, 2));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Compile request failed');
    } finally { setCompiling(false); }
  };

  return <PanelCard title={`Umbrella Policy Compiler (Live: ${online ? 'Online' : 'Offline'})`}>
    <h3>Live Rules</h3>
    {!data ? 'Waiting for rule events…' : <pre className="payload">{JSON.stringify(data, null, 2)}</pre>}
    <h3>Compile New Rule</h3>
    <textarea value={source} onChange={(event) => setSource(event.target.value)} rows={6} aria-label="Umbrella rule source" />
    <button type="button" onClick={() => void compile()} disabled={compiling || !source.trim()}>{compiling ? 'Compiling…' : 'Compile'}</button>
    {error && <p className="error" role="alert">{error}</p>}
    <h3>Compile Result</h3>
    <pre className="payload">{result || 'No compile result.'}</pre>
  </PanelCard>;
}
