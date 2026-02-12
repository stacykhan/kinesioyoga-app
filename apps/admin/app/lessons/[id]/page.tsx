'use client';

import { AdminGate } from '@/components/AdminGate';
import { LessonForm } from '@/components/LessonForm';
import { lessonSchema } from '@/lib/zodSchemas';
import { supabase } from '@/lib/supabaseClient';
import { useParams, useRouter } from 'next/navigation';

export default function EditLessonPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  return (
    <AdminGate>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Edit lesson #{id}</h1>
        <LessonForm onSubmit={async (payload) => {
          const parsed = lessonSchema.parse(payload);
          await supabase.from('lessons').update(parsed).eq('id', Number(id));
          router.push('/lessons');
        }} />
      </div>
    </AdminGate>
  );
}
