import { useState } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { signIn, signOut, signUp } from '../lib/auth';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, padding: 16, gap: 8 }}>
      <LanguageSwitcher />
      <Text>{t('subscription')}: Free / Premium</Text>
      <TextInput placeholder="email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="password" value={password} secureTextEntry onChangeText={setPassword} style={{ borderWidth: 1, padding: 8 }} />
      <Pressable onPress={() => signIn(email, password)}><Text>{t('signIn')}</Text></Pressable>
      <Pressable onPress={() => signUp(email, password)}><Text>{t('signUp')}</Text></Pressable>
      <Pressable onPress={() => signOut()}><Text>{t('logout')}</Text></Pressable>
    </View>
  );
}
