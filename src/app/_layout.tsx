import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PartyProvider } from '../contexts/PartyContext';

export default function RootLayout() {
  return (
      <PartyProvider>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </PartyProvider>
  );
}