'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    requireAdmin().then((ok) => {
      if (!ok) {
        router.replace('/login');
        return;
      }
      setAllowed(true);
    });
  }, [router]);

  if (!allowed) return <p>Checking permissions...</p>;
  return <>{children}</>;
}
