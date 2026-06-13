import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../src/store/appStore';
import { Card } from '../../src/components/Card';
import { ProgressBar } from '../../src/components/ProgressBar';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

type Tab = 'daily' | 'weekly' | 'monthly';

const QUESTS = {
  daily: [
    { id: 'd1', title: '3 komut tekrarı', emoji: '🎯', progress: 3, total: 3, xp: 30, done: true },
    { id: 'd2', title: '20 dk yürüyüş', emoji: '🏃', progress: 14, total: 20, xp: 40, done: false },
    { id: 'd3', title: 'Fotoğraf paylaş', emoji: '📸', progress: 0, total: 1, xp: 20, done: false },
  ],
  weekly: [
    { id: 'w1', title: '5 gün art arda antren.', emoji: '🔥', progress: 3, total: 5, xp: 150, done: false },
    { id: 'w2', title: '10 km toplam yürüyüş', emoji: '🗺️', progress: 6.4, total: 10, xp: 200, done: false },
    { id: 'w3', title: '3 yeni numara öğret', emoji: '✨', progress: 1, total: 3, xp: 100, done: false },
  ],
  monthly: [
    { id: 'm1', title: '30 günlük seri', emoji: '📅', progress: 14, total: 30, xp: 500, done: false },
    { id: 'm2', title: '50 km toplam', emoji: '🏆', progress: 28, total: 50, xp: 400, done: false },
    { id: 'm3', title: 'Tüm temel modülü bitir', emoji: '🎓', progress: 5, total: 8, xp: 600, done: false },
  ],
};

export default function QuestsScreen() {
  const { theme } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>('daily');

  const quests = QUESTS[activeTab];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Görevler 📋</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {(['daily', 'weekly', 'monthly'] as Tab[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && { backgroundColor: theme.primary }]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === tab && { color: palette.white }]}>
                {tab === 'daily' ? 'Günlük' : tab === 'weekly' ? 'Haftalık' : 'Aylık'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          {quests.map((quest) => (
            <Card key={quest.id} style={styles.questCard} padding={18}>
              <View style={styles.questRow}>
                <Text style={styles.questEmoji}>{quest.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <View style={styles.questTopRow}>
                    <Text style={[styles.questTitle, quest.done && styles.doneText]}>{quest.title}</Text>
                    <View style={[styles.xpPill, { backgroundColor: theme.primarySurface }]}>
                      <Text style={[styles.xpText, { color: theme.primary }]}>+{quest.xp} XP</Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <ProgressBar progress={quest.done ? 1 : quest.progress / quest.total} height={6} />
                    <Text style={styles.progressLabel}>
                      {quest.done ? '✅ Tamamlandı' : `${quest.progress} / ${quest.total}`}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.offWhite },
  scroll: { paddingBottom: 32 },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 },
  title: { ...textStyles.h2, color: palette.gray900 },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 16,
    backgroundColor: palette.gray100,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 9,
    alignItems: 'center',
  },
  tabText: { fontFamily: fonts.bold, fontSize: 13, color: palette.gray400 },
  section: { paddingHorizontal: 20, gap: 10 },
  questCard: {},
  questRow: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  questEmoji: { fontSize: 28, marginTop: 2 },
  questTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  questTitle: { fontFamily: fonts.bold, fontSize: 14, color: palette.gray900, flex: 1, marginRight: 8 },
  doneText: { textDecorationLine: 'line-through', color: palette.gray400 },
  xpPill: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  xpText: { fontFamily: fonts.bold, fontSize: 12 },
  progressLabel: { fontFamily: fonts.regular, fontSize: 12, color: palette.gray400, marginTop: 6 },
});
