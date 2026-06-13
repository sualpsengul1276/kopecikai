import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../../src/store/appStore';
import { Card } from '../../src/components/Card';
import { ProgressBar } from '../../src/components/ProgressBar';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

const CHALLENGES = [
  {
    id: 'c1', title: '7 Günlük Koşucu', emoji: '🏃',
    description: 'Üst üste 7 gün yürüyüş yap',
    progress: 4, total: 7, xp: 350, daysLeft: 3,
    color: palette.success, joined: true,
  },
  {
    id: 'c2', title: 'Komut Ustası', emoji: '🎯',
    description: '50 başarılı komut tamamla',
    progress: 23, total: 50, xp: 500, daysLeft: 10,
    color: palette.blue, joined: true,
  },
  {
    id: 'c3', title: 'Sosyal Kelebek', emoji: '🦋',
    description: '5 farklı köpekle buluştur',
    progress: 2, total: 5, xp: 250, daysLeft: 7,
    color: palette.mauve, joined: false,
  },
  {
    id: 'c4', title: 'Maraton Yürüyüşçü', emoji: '🗺️',
    description: '1 haftada toplam 20 km yürü',
    progress: 8.4, total: 20, xp: 400, daysLeft: 4,
    color: palette.warning, joined: false,
  },
  {
    id: 'c5', title: 'Eğitim Serisi', emoji: '📚',
    description: '10 gün art arda antrenman yap',
    progress: 6, total: 10, xp: 300, daysLeft: 4,
    color: '#9B59B6', joined: false,
  },
];

export default function ChallengesScreen() {
  const { theme } = useAppStore();
  const [joined, setJoined] = useState<string[]>(['c1', 'c2']);

  const activeChallenges = CHALLENGES.filter((c) => joined.includes(c.id));
  const availableChallenges = CHALLENGES.filter((c) => !joined.includes(c.id));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Meydan Okumalar 💪</Text>
          <Text style={styles.subtitle}>Topluluğa katıl, birlikte başar</Text>
        </View>

        {/* Active challenges */}
        {activeChallenges.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aktif ({activeChallenges.length})</Text>
            {activeChallenges.map((ch) => (
              <Card key={ch.id} padding={18} style={styles.challengeCard}>
                <View style={styles.chTop}>
                  <View style={[styles.chIcon, { backgroundColor: ch.color + '18' }]}>
                    <Text style={{ fontSize: 28 }}>{ch.emoji}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.chTitle}>{ch.title}</Text>
                    <Text style={styles.chDesc}>{ch.description}</Text>
                  </View>
                  <View style={styles.daysLeft}>
                    <Text style={styles.daysNum}>{ch.daysLeft}</Text>
                    <Text style={styles.daysLabel}>gün</Text>
                  </View>
                </View>
                <View style={styles.chProgress}>
                  <ProgressBar progress={ch.progress / ch.total} height={7} />
                  <View style={styles.chProgressRow}>
                    <Text style={styles.chProgressText}>
                      {typeof ch.progress === 'number' && ch.progress % 1 !== 0
                        ? ch.progress.toFixed(1) : ch.progress} / {ch.total}
                    </Text>
                    <View style={[styles.xpPill, { backgroundColor: ch.color + '18' }]}>
                      <Text style={[styles.xpText, { color: ch.color }]}>+{ch.xp} XP</Text>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Available */}
        {availableChallenges.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Keşfet</Text>
            {availableChallenges.map((ch) => (
              <Card key={ch.id} padding={18} style={styles.challengeCard}>
                <View style={styles.chTop}>
                  <View style={[styles.chIcon, { backgroundColor: ch.color + '18' }]}>
                    <Text style={{ fontSize: 28 }}>{ch.emoji}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.chTitle}>{ch.title}</Text>
                    <Text style={styles.chDesc}>{ch.description}</Text>
                    <View style={styles.chMeta}>
                      <Text style={styles.chMetaText}>⏰ {ch.daysLeft} gün kaldı</Text>
                      <View style={[styles.xpPill, { backgroundColor: ch.color + '18' }]}>
                        <Text style={[styles.xpText, { color: ch.color }]}>+{ch.xp} XP</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.joinBtn, { backgroundColor: ch.color }]}
                  onPress={() => setJoined((prev) => [...prev, ch.id])}
                  activeOpacity={0.85}
                >
                  <Text style={styles.joinText}>Katıl →</Text>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.offWhite },
  scroll: { paddingBottom: 40 },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 },
  title: { ...textStyles.h2, color: palette.gray900 },
  subtitle: { ...textStyles.body, color: palette.gray400, marginTop: 4 },
  section: { paddingHorizontal: 20, marginTop: 20, gap: 10 },
  sectionTitle: { ...textStyles.h4, color: palette.gray900, marginBottom: 4 },
  challengeCard: {},
  chTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 14 },
  chIcon: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  chTitle: { fontFamily: fonts.bold, fontSize: 15, color: palette.gray900 },
  chDesc: { fontFamily: fonts.regular, fontSize: 13, color: palette.gray600, marginTop: 3 },
  chMeta: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  chMetaText: { fontFamily: fonts.medium, fontSize: 12, color: palette.gray400 },
  daysLeft: { alignItems: 'center', backgroundColor: palette.gray50, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 },
  daysNum: { fontFamily: fonts.extraBold, fontSize: 18, color: palette.gray900 },
  daysLabel: { fontFamily: fonts.regular, fontSize: 11, color: palette.gray400 },
  chProgress: {},
  chProgressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  chProgressText: { fontFamily: fonts.medium, fontSize: 12, color: palette.gray400 },
  xpPill: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  xpText: { fontFamily: fonts.bold, fontSize: 12 },
  joinBtn: { borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginTop: 4 },
  joinText: { fontFamily: fonts.bold, fontSize: 14, color: palette.white },
});
