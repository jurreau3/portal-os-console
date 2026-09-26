// src/components/MaxOSVersionPanel.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { MaxOSVersionInfo } from '../api/types';

export function MaxOSVersionPanel() {
  const [info, setInfo] = useState<MaxOSVersionInfo | null>(null);

  useEffect(() => {
    api.maxOSVersion().then(setInfo).catch(console.error);
  }, []);

  if (!info) return <div>Loading MaxOS version…</div>;

  return (
    <div className="panel maxos-version">
      <h2>MAX‑OS Version</h2>
      <p>Version: {info.version}</p>
      <p>Build: {info.build}</p>
      <p>Phase: {info.phase}</p>
    </div>
  );
}
