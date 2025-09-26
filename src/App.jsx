import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoginFarcaster from './LoginFarcaster';

export default function App() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  const playOnce = async () => {
    try {
      const body = user
        ? { fid: user.fid, username: user.username }
        : { fid: 'guest', username: 'guest' }; // fallback agar tidak error

      const r = await fetch('/api/game/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const j = await r.json();
      setLastResult(j);
    } catch (e) {
      setErr(e);
    }
  };

  return (
    <ErrorBoundary>
      <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
        <h1>🐍 Crypto Snakes & Ladders</h1>

        {err && (
          <div style={{ color: '#b91c1c', margin: '0.5rem 0' }}>
            <strong>❌ Error:</strong>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{String(err)}</pre>
          </div>
        )}

        {!user ? (
          <div style={{ marginBottom: '1rem' }}>
            <p>Silakan login dengan Farcaster untuk mulai main.</p>
            <LoginFarcaster onLogin={setUser} onError={setErr} />
          </div>
        ) : (
          <div style={{ marginBottom: '1rem' }}>
            <p>Halo {user.username} (FID: {user.fid})</p>
          </div>
        )}

        {/* Tombol uji supaya tidak blank meskipun login gagal */}
        <button onClick={playOnce} style={{ padding: '0.6rem 1rem' }}>
          🎲 Coba Main (uji endpoint)
        </button>

        {lastResult && (
          <pre style={{ background: '#f3f4f6', padding: '0.5rem', marginTop: '0.75rem' }}>
{JSON.stringify(lastResult, null, 2)}
          </pre>
        )}
      </div>
    </ErrorBoundary>
  );
}
