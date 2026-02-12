'use client';

import { useState } from 'react';

export function LessonForm({ onSubmit }: { onSubmit: (payload: any) => Promise<void> }) {
  const [value, setValue] = useState('{\n  "slug": "",\n  "duration_minutes": 20,\n  "level": "beginner",\n  "category_id": 1,\n  "youtube_id": "",\n  "is_premium": false,\n  "translations": {"en": {"title":"","description":"","contraindications":""},"ru":{"title":"","description":"","contraindications":""},"it":{"title":"","description":"","contraindications":""}}\n}');

  return (
    <div className="space-y-3">
      <textarea className="h-80 w-full rounded border p-2 font-mono text-sm" value={value} onChange={(e) => setValue(e.target.value)} />
      <button className="rounded bg-black px-4 py-2 text-white" onClick={() => onSubmit(JSON.parse(value))}>Save</button>
    </div>
  );
}
