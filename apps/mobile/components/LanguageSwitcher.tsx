import { View, Pressable, Text } from 'react-native';
import i18n, { setLanguage } from '../lib/i18n';

const langs: Array<'en' | 'ru' | 'it'> = ['en', 'ru', 'it'];

export function LanguageSwitcher() {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {langs.map((lng) => (
        <Pressable key={lng} onPress={() => setLanguage(lng)} style={{ padding: 8, backgroundColor: i18n.language === lng ? '#111' : '#ddd' }}>
          <Text style={{ color: i18n.language === lng ? '#fff' : '#111' }}>{lng.toUpperCase()}</Text>
        </Pressable>
      ))}
    </View>
  );
}
