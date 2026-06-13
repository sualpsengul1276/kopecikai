import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../src/store/appStore';
import { Card } from '../../src/components/Card';
import { ProgressBar } from '../../src/components/ProgressBar';
import { Button } from '../../src/components/Button';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

const MODULES = [
  {
    id: 'basics',
    title: 'Temel Komutlar',
    emoji: '🎯',
    progress: 0.6,
    lessons: 8,
    completed: 5,
    xp: 200,
    color: palette.blue,
    locked: false,
  },
  {
    id: 'leash',
    title: 'Tasma Eğitimi',
    emoji: '🦮',
    progress: 0.2,
    lessons: 6,
    completed: 1,
    xp: 150,
    color: palette.mauve,
    locked: false,
  },
  {
    id: 'tricks',
    title: 'Numaralar',
    emoji: '✨',
    progress: 0,
    lessons: 10,
    completed: 0,
    xp: 300,
    color: palette.warning,
    locked: true,
  },
  {
    id: 'social',
    title: 'Sosyalleşme',
    emoji: '🐾',
    progress: 0,
    lessons: 5,
    completed: 0,
    xp: 100,
    color: palette.success,
    locked: true,
  },
];

export default function TrainingScreen() {
  const { theme, dog } = useAppStore();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Antrenman 🏋️</Text>
          <Text style={styles.subtitle}>{dog.name || 'Köpeğin'} için modüller</Text>
        </View>

        {/* Active lesson banner */}
        <View style={styles.section}>
          <Card style={{ ...styles.activeBanner, backgroundColor: theme.primary }} padding={20}>
            <View style={styles.activeBannerRow}>
              <Text style={{ fontSize: 40 }}>🎯</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.activeBannerLabel}>Devam Et</Text>
                <Text style={styles.activeBannerTitle}>Ders 6: "Yere Yat"</Text>
                <Text style={styles.activeBannerSub}>Temel Komutlar • +30 XP</Text>
              </View>
              <View style={styles.playBtn}>
                <Text style={{ fontSize: 22 }}>▶</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Modules */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tüm Modüller</Text>
          <View style={styles.moduleList}>
            {MODULES.map((mod) => (
              <TouchableOpacity
                key={mod.id}
                activeOpacity={mod.locked ? 1 : 0.8}
                style={[styles.moduleCard, mod.locked && styles.moduleLocked]}
              >
                <Card padding={16} style={{ opacity: mod.locked ? 0.6 : 1 }}>
                  <View style={styles.moduleRow}>
                    <View style={[styles.moduleIcon, { backgroundColor: mod.color + '18' }]}>
                      <Text style={{ fontSize: 26 }}>{mod.emoji}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.moduleTopRow}>
                        <Text style={styles.moduleTitle}>{mod.title}</Text>
                        {mod.locked && <Text style={styles.lockIcon}>🔒</Text>}
                      </View>
                      <Text style={styles.moduleMeta}>
                        {mod.completed}/{mod.lessons} ders • {mod.xp} XP
                      </Text>
                      <View style={{ marginTop: 8 }}>
                        <ProgressBar progress={mod.progress} height={5} />
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
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
  subtitle: { ...textStyles.body, color: palette.gray400, marginTop: 4 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { ...textStyles.h4, color: palette.gray900, marginBottom: 12 },
  activeBanner: { borderRadius: 20 },
  activeBannerRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  activeBannerLabel: { fontFamily: fonts.medium, fontSize: 12, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 0.5 },
  activeBannerTitle: { fontFamily: fonts.extraBold, fontSize: 17, color: palette.white, marginVertical: 2 },
  activeBannerSub: { fontFamily: fonts.regular, fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  playBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
  },
  moduleList: { gap: 10 },
  moduleCard: {},
  moduleLocked: {},
  moduleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  moduleIcon: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  moduleTopRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  moduleTitle: { fontFamily: fonts.bold, fontSize: 15, color: palette.gray900 },
  lockIcon: { fontSize: 14 },
  moduleMeta: { fontFamily: fonts.regular, fontSize: 13, color: palette.gray400, marginTop: 3 },
});
