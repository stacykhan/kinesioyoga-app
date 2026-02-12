'use client';

import { useState } from 'react';
import { signInAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <div className="mx-auto max-w-md space-y-3 rounded bg-white p-4 shadow">
      <h1 className="text-xl font-semibold">Admin login</h1>
      <input className="w-full rounded border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full rounded border p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="rounded bg-black px-3 py-2 text-white" onClick={async () => {
        const { error } = await signInAdmin(email, password);
        if (!error) router.push('/dashboard');
      }}>Login</button>
    </div>
  );
}
