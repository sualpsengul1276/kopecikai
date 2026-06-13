import React from 'react';
import { Tabs } from 'expo-router';
import { useAppStore } from '../../src/store/appStore';
import { palette } from '../../src/theme/colors';
import { fonts } from '../../src/theme/typography';
import { Platform } from 'react-native';

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
          height: Platform.OS === 'ios' ? 84 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.bold,
          fontSize: 9,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ tabBarLabel: '🏠 Ev' }} />
      <Tabs.Screen name="schedule" options={{ tabBarLabel: '🤖 Program' }} />
      <Tabs.Screen name="training" options={{ tabBarLabel: '🎯 Antren' }} />
      <Tabs.Screen name="walk" options={{ tabBarLabel: '🗺️ Yürüyüş' }} />
      <Tabs.Screen name="quests" options={{ tabBarLabel: '📋 Görev' }} />
      <Tabs.Screen name="challenges" options={{ tabBarLabel: '💪 Meydan' }} />
      <Tabs.Screen name="social" options={{ tabBarLabel: '🐾 Sosyal' }} />
      <Tabs.Screen name="leaderboard" options={{ tabBarLabel: '🏆 Lider' }} />
      <Tabs.Screen name="rewards" options={{ tabBarLabel: '⚡️ Ödül' }} />
    </Tabs>
  );
}
