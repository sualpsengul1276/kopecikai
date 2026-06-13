import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../src/store/appStore';
import { Card } from '../../src/components/Card';
import { ProgressBar } from '../../src/components/ProgressBar';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

const { width } = Dimensions.get('window');

const TODAY_TASKS = [
  { id: '1', title: 'Sabah yürüyüşü', duration: '20 dk', xp: 30, emoji: '🌅', done: false },
  { id: '2', title: '"Otur" komutu', duration: '10 dk', xp: 20, emoji: '🎯', done: true },
  { id: '3', title: 'Sosyalleşme', duration: '15 dk', xp: 25, emoji: '🤝', done: false },
  { id: '4', title: 'Oyun zamanı', duration: '15 dk', xp: 15, emoji: '🎾', done: false },
];

export default function HomeScreen() {
  const router = useRouter();
  const { theme, dog, xp, streak } = useAppStore();
  const completed = TODAY_TASKS.filter((t) => t.done).length;
  const progress = completed / TODAY_TASKS.length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <LinearGradient
          colors={[theme.primary, theme.primaryDark]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Merhaba! 👋</Text>
              <Text style={styles.dogName}>{dog.name || 'Köpeğin'} için</Text>
            </View>
            <View style={styles.xpBadge}>
              <Text style={styles.xpText}>⚡️ {xp} XP</Text>
            </View>
          </View>

          <View style={styles.streakRow}>
            <Text style={styles.streakText}>🔥 {streak} günlük seri</Text>
          </View>
        </LinearGradient>

        {/* Daily Progress */}
        <View style={styles.section}>
          <Card>
            <View style={styles.progressHeader}>
              <Text style={styles.sectionTitle}>Günlük Plan</Text>
              <Text style={[styles.progressCount, { color: theme.primary }]}>
                {completed}/{TODAY_TASKS.length}
              </Text>
            </View>
            <ProgressBar progress={progress} height={8} />
            <Text style={styles.progressLabel}>
              {completed === TODAY_TASKS.length
                ? '🎉 Harika! Tüm görevler tamamlandı!'
                : `${TODAY_TASKS.length - completed} görev kaldı`}
            </Text>
          </Card>
        </View>

        {/* Today's Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bugünün Görevleri</Text>
          <View style={styles.taskList}>
            {TODAY_TASKS.map((task) => (
              <TouchableOpacity key={task.id} activeOpacity={0.8}>
                <Card style={task.done ? { ...styles.taskCard, ...styles.taskDone } : styles.taskCard}>
                  <Text style={styles.taskEmoji}>{task.emoji}</Text>
                  <View style={styles.taskInfo}>
                    <Text style={[styles.taskTitle, task.done && styles.taskTitleDone]}>
                      {task.title}
                    </Text>
                    <Text style={styles.taskMeta}>{task.duration}</Text>
                  </View>
                  <View style={[styles.xpPill, { backgroundColor: theme.primarySurface }]}>
                    <Text style={[styles.xpPillText, { color: theme.primary }]}>+{task.xp} XP</Text>
                  </View>
                  {task.done && (
                    <View style={[styles.doneCheck, { backgroundColor: theme.primary }]}>
                      <Text style={{ color: '#fff', fontSize: 12 }}>✓</Text>
                    </View>
                  )}
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hızlı Başlat</Text>
          <View style={styles.quickRow}>
            {[
              { label: 'Yürüyüş', emoji: '🗺️', color: palette.success, route: '/tabs/walk' },
              { label: 'AI Program', emoji: '🤖', color: palette.blue, route: '/tabs/schedule' },
              { label: 'Ödüller', emoji: '⚡️', color: palette.mauve, route: '/tabs/rewards' },
            ].map((item) => (
              <TouchableOpacity
                key={item.label}
                style={[styles.quickCard, { borderColor: item.color + '30', backgroundColor: item.color + '10' }]}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
                <Text style={[styles.quickLabel, { color: item.color }]}>{item.label}</Text>
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 4,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { fontFamily: fonts.medium, fontSize: 15, color: 'rgba(255,255,255,0.8)' },
  dogName: { fontFamily: fonts.black, fontSize: 26, color: palette.white, marginTop: 2 },
  xpBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  xpText: { fontFamily: fonts.bold, color: palette.white, fontSize: 15 },
  streakRow: { marginTop: 14 },
  streakText: { fontFamily: fonts.medium, color: 'rgba(255,255,255,0.85)', fontSize: 14 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { ...textStyles.h4, color: palette.gray900, marginBottom: 12 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progressCount: { fontFamily: fonts.extraBold, fontSize: 18 },
  progressLabel: { ...textStyles.caption, color: palette.gray400, marginTop: 8 },
  taskList: { gap: 10 },
  taskCard: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  taskDone: { opacity: 0.6 },
  taskEmoji: { fontSize: 26 },
  taskInfo: { flex: 1 },
  taskTitle: { fontFamily: fonts.bold, fontSize: 15, color: palette.gray900 },
  taskTitleDone: { textDecorationLine: 'line-through', color: palette.gray400 },
  taskMeta: { fontFamily: fonts.regular, fontSize: 13, color: palette.gray400, marginTop: 2 },
  xpPill: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  xpPillText: { fontFamily: fonts.bold, fontSize: 12 },
  doneCheck: {
    width: 22, height: 22, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center', marginLeft: 4,
  },
  quickRow: { flexDirection: 'row', gap: 10 },
  quickCard: {
    flex: 1, borderRadius: 16, borderWidth: 1.5,
    alignItems: 'center', paddingVertical: 16, gap: 8,
  },
  quickLabel: { fontFamily: fonts.bold, fontSize: 13 },
});
