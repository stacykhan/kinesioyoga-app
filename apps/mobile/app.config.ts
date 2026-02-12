import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'KinesioYoga',
  slug: 'kinesioyoga-mobile',
  scheme: 'kinesioyoga',
  plugins: ['expo-router'],
  experiments: { typedRoutes: true },
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    rcIos: process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY,
    rcAndroid: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY
  }
};

export default config;
