'use client';

import { AdminGate } from '@/components/AdminGate';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Array<{ id: number; slug: string; translations: Record<string, string> }>>([]);
  const [slug, setSlug] = useState('');
  const [translations, setTranslations] = useState('{"en":"","ru":"","it":""}');

  useEffect(() => {
    supabase.from('categories').select('*').then(({ data }) => setCategories(data ?? []));
  }, []);

  return (
    <AdminGate>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Categories</h1>
        <div className="space-y-2 rounded bg-white p-3 shadow-sm">
          <input className="w-full rounded border p-2" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug" />
          <textarea className="h-24 w-full rounded border p-2 font-mono text-xs" value={translations} onChange={(e) => setTranslations(e.target.value)} />
          <button className="rounded bg-black px-3 py-2 text-white" onClick={async () => {
            await supabase.from('categories').insert({ slug, translations: JSON.parse(translations) });
            const { data } = await supabase.from('categories').select('*');
            setCategories(data ?? []);
          }}>Create</button>
        </div>
        {categories.map((c) => (
          <div key={c.id} className="rounded border bg-white p-3">
            <p>{c.slug}</p>
            <pre className="text-xs">{JSON.stringify(c.translations, null, 2)}</pre>
          </div>
        ))}
      </div>
    </AdminGate>
  );
}
