import React, { useState } from 'react'
import LoginFarcaster from './LoginFarcaster'

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>🐍 Crypto Snakes & Ladders</h1>

      {!user ? (
        <div>
          <p>Silakan login dengan Farcaster untuk mulai main.</p>
          <LoginFarcaster onLogin={setUser} />
        </div>
      ) : (
        <div>
          <p>Halo {user.username} (FID: {user.fid})</p>
          <button
            onClick={() =>
              fetch('/api/game/play', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fid: user.fid, username: user.username })
              }).then((r) => r.json().then(console.log))
            }
          >
            🎲 Main Sekarang
          </button>
        </div>
      )}
    </div>
  )
}
