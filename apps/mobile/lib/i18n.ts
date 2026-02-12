import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import it from '../locales/it.json';

const storageKey = 'kinesio-language';
const resources = { en: { translation: en }, ru: { translation: ru }, it: { translation: it } };

const detectLanguage = async () => {
  const saved = await AsyncStorage.getItem(storageKey);
  if (saved && ['en', 'ru', 'it'].includes(saved)) return saved;
  const code = Localization.getLocales()[0]?.languageCode;
  return ['en', 'ru', 'it'].includes(code ?? '') ? code : 'en';
};

export const setupI18n = async () => {
  const lng = await detectLanguage();
  await i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });
};

export const setLanguage = async (lng: 'en' | 'ru' | 'it') => {
  await i18n.changeLanguage(lng);
  await AsyncStorage.setItem(storageKey, lng);
};

export default i18n;
