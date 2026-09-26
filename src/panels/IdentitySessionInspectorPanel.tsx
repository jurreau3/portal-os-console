// src/panels/IdentitySessionInspectorPanel.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { IdentitySession } from '../api/types';

export function IdentitySessionInspectorPanel() {
  const [session, setSession] = useState<IdentitySession | null>(null);

  useEffect(() => {
    api.identitySession().then(setSession).catch(console.error);
  }, []);

  if (!session) return <div>No active identity session.</div>;

  return (
    <div className="panel identity-session">
      <h2>Identity Session</h2>
      <p>Session ID: {session.sessionId}</p>
      <p>User ID: {session.userId}</p>
      <p>Issued: {new Date(session.issuedAt).toLocaleString()}</p>
      <p>Expires: {new Date(session.expiresAt).toLocaleString()}</p>
      {session.ipAddress && <p>IP: {session.ipAddress}</p>}
      {session.userAgent && <p>UA: {session.userAgent}</p>}
    </div>
  );
}
