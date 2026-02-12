'use client';

import { AdminGate } from '@/components/AdminGate';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { DataTable } from '@/components/DataTable';

export default function LessonsPage() {
  const [rows, setRows] = useState<Array<{ id: number; slug: string }>>([]);
  useEffect(() => {
    supabase.from('lessons').select('id,slug').then(({ data }) => setRows(data ?? []));
  }, []);

  return (
    <AdminGate>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Lessons</h1>
          <Link href="/lessons/new" className="rounded bg-black px-3 py-2 text-white">New lesson</Link>
        </div>
        <DataTable rows={rows} editPath="/lessons" />
      </div>
    </AdminGate>
  );
}
