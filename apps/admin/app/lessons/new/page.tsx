'use client';

import { AdminGate } from '@/components/AdminGate';
import { LessonForm } from '@/components/LessonForm';
import { lessonSchema } from '@/lib/zodSchemas';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewLessonPage() {
  const router = useRouter();

  return (
    <AdminGate>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Create lesson</h1>
        <LessonForm onSubmit={async (payload) => {
          const parsed = lessonSchema.parse(payload);
          await supabase.from('lessons').insert(parsed);
          router.push('/lessons');
        }} />
      </div>
    </AdminGate>
  );
}
