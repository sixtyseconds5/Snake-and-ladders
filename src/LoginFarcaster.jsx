import React from 'react'
import { AuthKitProvider, SignInButton } from '@farcaster/auth-kit'

export default function LoginFarcaster({ onLogin }) {
  return (
    <AuthKitProvider
      config={{
        rpcUrl: 'https://api.neynar.com/v2/farcaster',
        domain: typeof window !== 'undefined'
          ? window.location.origin
          : 'https://snake-and-ladders-phi.vercel.app'
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Login dengan Farcaster</h2>
        <SignInButton
          onSuccess={(user) => {
            console.log(user)
            onLogin(user)
          }}
        />
      </div>
    </AuthKitProvider>
  )
}
