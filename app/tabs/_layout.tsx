import React from 'react';
import { Tabs } from 'expo-router';
import { useAppStore } from '../../src/store/appStore';
import { palette } from '../../src/theme/colors';
import { fonts } from '../../src/theme/typography';
import { Platform } from 'react-native';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <React.Fragment>
      {/* expo-router renders label separately */}
      {null}
    </React.Fragment>
  );
}

export default function TabsLayout() {
  const theme = useAppStore((s) => s.theme);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: palette.gray400,
        tabBarStyle: {
          backgroundColor: palette.white,
          borderTopColor: palette.gray100,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.bold,
          fontSize: 10,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Ana Sayfa', tabBarIcon: ({ focused }) => null, tabBarLabel: '🏠 Ev' }}
      />
      <Tabs.Screen
        name="training"
        options={{ title: 'Antrenman', tabBarLabel: '🎯 Antren' }}
      />
      <Tabs.Screen
        name="quests"
        options={{ title: 'Görevler', tabBarLabel: '📋 Görevler' }}
      />
      <Tabs.Screen
        name="social"
        options={{ title: 'Topluluk', tabBarLabel: '🐾 Sosyal' }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{ title: 'Liderlik', tabBarLabel: '🏆 Liderlik' }}
      />
    </Tabs>
  );
}
