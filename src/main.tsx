import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const api = 'https://planetary-max.maxchaz1.workers.dev';

async function ping(): Promise<void> {
  try {
    const res = await fetch(`${api}/api/status`);
    if (!res.ok) throw new Error(`Status request failed (${res.status})`);
    const json = await res.json();
    console.log('Portal-OS Worker Status:', json);
  } catch (error) {
    console.error('Portal-OS Worker unavailable:', error);
  }
}

void ping();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
