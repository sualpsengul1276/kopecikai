import { Stack } from 'expo-router';
import { palette } from '../../src/theme/colors';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerBackTitle: '',
        headerTitle: '',
        headerStyle: { backgroundColor: palette.offWhite },
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dog-name" />
      <Stack.Screen name="dog-details" />
      <Stack.Screen name="owner-routine" />
      <Stack.Screen name="goals" />
      <Stack.Screen name="complete" options={{ headerShown: false }} />
    </Stack>
  );
}
