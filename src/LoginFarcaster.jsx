import React from 'react'
import { AuthKitProvider, SignInButton } from '@farcaster/auth-kit'

export default function LoginFarcaster({ onLogin }) {
  const domain =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://snake-and-ladders-phi.vercel.app'

  return (
    <AuthKitProvider
      config={{
        rpcUrl: 'https://api.neynar.com/v2/farcaster',
        domain
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>Login dengan Farcaster</h2>
        <SignInButton
          onSuccess={(user) => {
            console.log('Login sukses:', user)
            onLogin(user)
          }}
          onError={(err) => {
            console.error('Login gagal:', err)
          }}
        />
      </div>
    </AuthKitProvider>
  )
}
