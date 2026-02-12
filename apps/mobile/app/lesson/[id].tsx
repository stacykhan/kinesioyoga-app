import { useLocalSearchParams, router } from 'expo-router';
import { Text, View, Pressable } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useQuery } from '@tanstack/react-query';
import i18n from '../../lib/i18n';
import { fetchLessons, markDone, saveFavorite } from '../../lib/api';
import { canAccessLesson } from '../../lib/gating';
import { getSession } from '../../lib/auth';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function LessonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { data = [] } = useQuery({ queryKey: ['lessons'], queryFn: fetchLessons });
  const lesson = useMemo(() => data.find((l) => String(l.id) === id), [data, id]);

  useEffect(() => {
    const gate = async () => {
      if (!lesson) return;
      const session = await getSession();
      const ok = await canAccessLesson(lesson.is_premium, Boolean(session.data.session?.user));
      if (!ok) router.replace('/paywall');
    };
    gate();
  }, [lesson]);

  if (!lesson) return <View><Text>Loading...</Text></View>;

  const tr = lesson.translations[i18n.language] ?? lesson.translations.en;

  const handleSave = async () => {
    const session = await getSession();
    const user = session.data.session?.user;
    if (!user) return router.push('/profile');
    await saveFavorite(user.id, lesson.id);
  };

  const handleDone = async () => {
    const session = await getSession();
    const user = session.data.session?.user;
    if (!user) return router.push('/profile');
    await markDone(user.id, lesson.id);
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>{tr.title}</Text>
      <YoutubePlayer height={220} videoId={lesson.youtube_id} />
      <Text>{tr.description}</Text>
      <Text>⚠️ {tr.contraindications}</Text>
      <Pressable onPress={handleSave}><Text>{t('save')}</Text></Pressable>
      <Pressable onPress={handleDone}><Text>{t('done')}</Text></Pressable>
    </View>
  );
}
