'use client';

import { AdminGate } from '@/components/AdminGate';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Array<{ id: number; slug: string; translations: Record<string, string> }>>([]);
  useEffect(() => {
    supabase.from('programs').select('*').then(({ data }) => setPrograms(data ?? []));
  }, []);

  return (
    <AdminGate>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Programs</h1>
        {programs.map((p) => (
          <div key={p.id} className="rounded border bg-white p-3">
            <p className="font-medium">{p.slug}</p>
            <pre className="overflow-auto text-xs">{JSON.stringify(p.translations, null, 2)}</pre>
          </div>
        ))}
      </div>
    </AdminGate>
  );
}
