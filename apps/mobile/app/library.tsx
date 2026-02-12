import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import i18n from '../lib/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchLessons } from '../lib/api';
import { FilterBar } from '../components/FilterBar';
import { LessonCard } from '../components/LessonCard';

export default function LibraryScreen() {
  const [q, setQ] = useState('');
  const { data = [] } = useQuery({ queryKey: ['lessons'], queryFn: fetchLessons });

  const filtered = useMemo(
    () => data.filter((l) => l.translations[i18n.language]?.title?.toLowerCase().includes(q.toLowerCase())),
    [data, q]
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FilterBar value={q} onChange={setQ} />
      {filtered.map((lesson) => (
        <LessonCard
          key={lesson.id}
          title={lesson.translations[i18n.language]?.title ?? lesson.slug}
          duration={lesson.duration_minutes}
          level={lesson.level}
          premium={lesson.is_premium}
          onPress={() => router.push(`/lesson/${lesson.id}`)}
        />
      ))}
    </View>
  );
}
