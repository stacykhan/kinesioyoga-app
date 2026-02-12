import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { setupI18n } from '../lib/i18n';

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    setupI18n();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="library" options={{ title: 'Library' }} />
        <Stack.Screen name="program" options={{ title: 'Program' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="paywall" options={{ title: 'Premium' }} />
        <Stack.Screen name="lesson/[id]" options={{ title: 'Lesson' }} />
      </Stack>
    </QueryClientProvider>
  );
}
