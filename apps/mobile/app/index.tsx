import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>{t('continue')}</Text>
      <Link href="/library">{t('library')}</Link>
      <Text style={{ fontWeight: '600' }}>{t('quick')}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Text>10 min</Text><Text>20 min</Text><Text>30 min</Text>
      </View>
      <Text style={{ fontWeight: '600' }}>{t('programs')}</Text>
      <Link href="/program">21-day program</Link>
      <Link href="/profile">{t('profile')}</Link>
    </View>
  );
}
