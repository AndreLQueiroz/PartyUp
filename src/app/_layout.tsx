import { Stack } from 'expo-router';

import { AuthProvider } from '../contexts/AuthContext';
import { PartyProvider } from '../contexts/PartyContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <PartyProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />

          <Stack.Screen name="login" />

          <Stack.Screen name="cadastro" />

          <Stack.Screen name="(tabs)" />

          <Stack.Screen name="party/[id]" />

          <Stack.Screen name="chat/[id]" />
        </Stack>
      </PartyProvider>
    </AuthProvider>
  );
}