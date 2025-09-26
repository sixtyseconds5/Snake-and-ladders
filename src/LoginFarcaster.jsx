import React, { useEffect, useState } from 'react';

export default function LoginFarcaster({ onLogin, onError }) {
  const [AuthKit, setAuthKit] = useState(null);   // { AuthKitProvider, SignInButton }
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // muat modul hanya di browser
        if (typeof window === 'undefined') return;
        const mod = await import('@farcaster/auth-kit');
        if (!mounted) return;
        setAuthKit({ AuthKitProvider: mod.AuthKitProvider, SignInButton: mod.SignInButton });
      } catch (e) {
        console.error('Gagal load @farcaster/auth-kit:', e);
        setFailed(true);
        onError && onError(e);
      }
    })();
    return () => { mounted = false; };
  }, [onError]);

  // Fallback saat modul belum siap
  if (!AuthKit && !failed) {
    return <p>Memuat komponen login…</p>;
  }

  // Jika gagal, tampilkan fallback yang tidak memblok UI
  if (failed || !AuthKit?.AuthKitProvider || !AuthKit?.SignInButton) {
    return (
      <div>
        <p style={{ color: '#b91c1c' }}>
          Tidak bisa memuat tombol login Farcaster.
        </p>
        <p>
          Kamu masih bisa lanjut lihat UI game (mode tanpa login) untuk memastikan tidak blank.
        </p>
      </div>
    );
  }

  const { AuthKitProvider, SignInButton } = AuthKit;
  const domain =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://snake-and-ladders-phi.vercel.app';

  return (
    <AuthKitProvider config={{ rpcUrl: 'https://api.neynar.com/v2/farcaster', domain }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>Login dengan Farcaster</h2>
        <SignInButton
          onSuccess={(user) => {
            console.log('Login sukses:', user);
            onLogin && onLogin(user);
          }}
          onError={(err) => {
            console.error('Login gagal:', err);
            onError && onError(err);
          }}
        />
      </div>
    </AuthKitProvider>
  );
}
