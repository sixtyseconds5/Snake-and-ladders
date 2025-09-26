import React, { useState } from 'react'
import ErrorBoundary from './ErrorBoundary'
import LoginFarcaster from './LoginFarcaster'
import GameBoard from './GameBoard'

export default function App() {
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(null)

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
          <div>
            <p>Halo {user.username} (FID: {user.fid})</p>
            <GameBoard />
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
