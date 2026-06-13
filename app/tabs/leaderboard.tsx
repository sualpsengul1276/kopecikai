import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../src/store/appStore';
import { Card } from '../../src/components/Card';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

const TOP_USERS = [
  { rank: 1, user: 'Selin K.', dog: 'Pamuk', avatar: '🐩', xp: 4850, streak: 28, medal: '🥇' },
  { rank: 2, user: 'Mert A.', dog: 'Karamel', avatar: '🐕', xp: 4210, streak: 21, medal: '🥈' },
  { rank: 3, user: 'Zeynep T.', dog: 'Şeker', avatar: '🦊', xp: 3950, streak: 19, medal: '🥉' },
  { rank: 4, user: 'Ali B.', dog: 'Rex', avatar: '🐶', xp: 3400, streak: 15, medal: null },
  { rank: 5, user: 'Ayşe M.', dog: 'Boncuk', avatar: '🐩', xp: 3100, streak: 12, medal: null },
  { rank: 12, user: 'Sen', dog: 'Köpeğin', avatar: '⭐', xp: 0, streak: 0, medal: null, isMe: true },
];

export default function LeaderboardScreen() {
  const { theme } = useAppStore();

  const top3 = TOP_USERS.slice(0, 3);
  const rest = TOP_USERS.slice(3);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Liderlik Tablosu 🏆</Text>
        </View>

        {/* Podium */}
        <View style={styles.podium}>
          {/* 2nd */}
          <View style={[styles.podiumItem, styles.podiumSecond]}>
            <Text style={styles.podiumAvatar}>{top3[1].avatar}</Text>
            <Text style={styles.podiumMedal}>{top3[1].medal}</Text>
            <Text style={styles.podiumName}>{top3[1].dog}</Text>
            <View style={[styles.podiumBar, styles.podiumBar2, { backgroundColor: palette.gray400 }]}>
              <Text style={styles.podiumRank}>2</Text>
            </View>
          </View>

          {/* 1st */}
          <View style={[styles.podiumItem, styles.podiumFirst]}>
            <Text style={{ fontSize: 14, marginBottom: 4, fontFamily: fonts.bold, color: palette.xpGold }}>
              👑 ŞAMPIYON
            </Text>
            <Text style={styles.podiumAvatar}>{top3[0].avatar}</Text>
            <Text style={styles.podiumMedal}>{top3[0].medal}</Text>
            <Text style={styles.podiumName}>{top3[0].dog}</Text>
            <Text style={styles.podiumXP}>{top3[0].xp} XP</Text>
            <View style={[styles.podiumBar, styles.podiumBar1, { backgroundColor: palette.xpGold }]}>
              <Text style={styles.podiumRank}>1</Text>
            </View>
          </View>

          {/* 3rd */}
          <View style={[styles.podiumItem, styles.podiumThird]}>
            <Text style={styles.podiumAvatar}>{top3[2].avatar}</Text>
            <Text style={styles.podiumMedal}>{top3[2].medal}</Text>
            <Text style={styles.podiumName}>{top3[2].dog}</Text>
            <View style={[styles.podiumBar, styles.podiumBar3, { backgroundColor: '#CD7F32' }]}>
              <Text style={styles.podiumRank}>3</Text>
            </View>
          </View>
        </View>

        {/* List */}
        <View style={styles.section}>
          {rest.map((entry: any) => (
            <Card
              key={entry.rank}
              padding={14}
              style={entry.isMe ? { ...styles.entryCard, borderWidth: 2, borderColor: theme.primary } : styles.entryCard}
            >
              <View style={styles.entryRow}>
                <Text style={styles.entryRank}>#{entry.rank}</Text>
                <View style={styles.entryAvatar}>
                  <Text style={{ fontSize: 22 }}>{entry.avatar}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.entryName, entry.isMe && { color: theme.primary }]}>
                    {entry.dog} {entry.isMe ? '(Sen)' : ''}
                  </Text>
                  <Text style={styles.entryUser}>{entry.user} · 🔥 {entry.streak} gün</Text>
                </View>
                <View style={[styles.xpPill, { backgroundColor: entry.isMe ? theme.primarySurface : palette.gray50 }]}>
                  <Text style={[styles.xpText, { color: entry.isMe ? theme.primary : palette.gray600 }]}>
                    {entry.xp} XP
                  </Text>
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
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
    height: 220,
  },
  podiumItem: { alignItems: 'center', flex: 1 },
  podiumFirst: { marginBottom: 0 },
  podiumSecond: { marginBottom: -20 },
  podiumThird: { marginBottom: -20 },
  podiumAvatar: { fontSize: 36, marginBottom: 4 },
  podiumMedal: { fontSize: 22, marginBottom: 4 },
  podiumName: { fontFamily: fonts.bold, fontSize: 12, color: palette.gray900, marginBottom: 6, textAlign: 'center' },
  podiumXP: { fontFamily: fonts.extraBold, fontSize: 13, color: palette.xpGold, marginBottom: 4 },
  podiumBar: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  podiumBar1: { height: 90 },
  podiumBar2: { height: 65 },
  podiumBar3: { height: 50 },
  podiumRank: { fontFamily: fonts.black, fontSize: 18, color: palette.white },
  section: { paddingHorizontal: 20, gap: 8, marginTop: 16 },
  entryCard: {},
  entryRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  entryRank: { fontFamily: fonts.extraBold, fontSize: 16, color: palette.gray400, width: 28 },
  entryAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: palette.gray100,
    alignItems: 'center', justifyContent: 'center',
  },
  entryName: { fontFamily: fonts.bold, fontSize: 14, color: palette.gray900 },
  entryUser: { fontFamily: fonts.regular, fontSize: 12, color: palette.gray400, marginTop: 2 },
  xpPill: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  xpText: { fontFamily: fonts.bold, fontSize: 13 },
});
