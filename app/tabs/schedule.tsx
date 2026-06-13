import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, Animated, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../../src/store/appStore';
import { generateWeeklySchedule, ScheduleDay, ScheduleTask } from '../../src/services/aiSchedule';
import { Card } from '../../src/components/Card';
import { Button } from '../../src/components/Button';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

const TIME_LABELS = {
  morning: { label: 'Sabah', emoji: '🌅' },
  afternoon: { label: 'Öğleden Sonra', emoji: '☀️' },
  evening: { label: 'Akşam', emoji: '🌙' },
};

const TYPE_COLORS: Record<string, string> = {
  training: palette.blue,
  walk: palette.success,
  play: palette.warning,
  social: palette.mauve,
  rest: palette.gray400,
};

function TaskCard({ task, completed, onComplete }: {
  task: ScheduleTask;
  completed: boolean;
  onComplete: (taskId: string, xp: number) => void;
}) {
  const theme = useAppStore((s) => s.theme);
  const typeColor = TYPE_COLORS[task.type] || theme.primary;

  return (
    <TouchableOpacity
      activeOpacity={completed ? 1 : 0.8}
      onPress={() => !completed && onComplete(task.id, task.xp)}
    >
      <Card padding={14} style={completed ? styles.taskDone : styles.taskCard}>
        <View style={styles.taskRow}>
          <View style={[styles.taskIconBg, { backgroundColor: typeColor + '18' }]}>
            <Text style={{ fontSize: 22 }}>{task.emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.taskTopRow}>
              <Text style={[styles.taskTitle, completed && styles.strikeThrough]}>
                {task.title}
              </Text>
              <View style={[styles.xpPill, { backgroundColor: theme.primarySurface }]}>
                <Text style={[styles.xpText, { color: theme.primary }]}>+{task.xp} XP</Text>
              </View>
            </View>
            <Text style={styles.taskDesc} numberOfLines={2}>{task.description}</Text>
            <Text style={styles.taskMeta}>{task.duration} dk · {TIME_LABELS[task.timeOfDay]?.emoji} {TIME_LABELS[task.timeOfDay]?.label}</Text>
          </View>
          {completed && (
            <View style={[styles.doneCircle, { backgroundColor: palette.success }]}>
              <Text style={{ color: '#fff', fontSize: 14 }}>✓</Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

function DayCard({ day, selectedDay, onSelect }: {
  day: ScheduleDay;
  selectedDay: string;
  onSelect: (d: string) => void;
}) {
  const theme = useAppStore((s) => s.theme);
  const isSelected = day.day === selectedDay;
  const dayShort = day.day.slice(0, 3);

  return (
    <TouchableOpacity
      style={[styles.dayChip, isSelected && { backgroundColor: theme.primary, borderColor: theme.primary }]}
      onPress={() => onSelect(day.day)}
      activeOpacity={0.8}
    >
      <Text style={[styles.dayShort, isSelected && { color: palette.white }]}>{dayShort}</Text>
      <Text style={[styles.dayXP, isSelected && { color: 'rgba(255,255,255,0.8)' }]}>
        {day.totalXP} XP
      </Text>
    </TouchableOpacity>
  );
}

export default function ScheduleScreen() {
  const { theme, dog, owner, schedule, scheduleLoading, setSchedule, setScheduleLoading, completedTaskIds, completeTask } = useAppStore();
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [streamText, setStreamText] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentDay = schedule?.days.find((d) => d.day === selectedDay) ?? schedule?.days[0] ?? null;

  const handleGenerate = async () => {
    setScheduleLoading(true);
    setSchedule(null);
    setStreamText('');

    try {
      const result = await generateWeeklySchedule(dog, owner, (partial) => {
        setStreamText(partial.slice(0, 100) + '...');
      });
      setSchedule(result);
      setSelectedDay(result.days[0]?.day ?? '');
    } catch (e: any) {
      console.error(e);
    } finally {
      setScheduleLoading(false);
      setStreamText('');
    }
  };

  if (scheduleLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={styles.loadingTitle}>Program hazırlanıyor...</Text>
          <Text style={styles.loadingSubtitle}>
            {dog.name || 'Köpeğin'} için AI kişisel program oluşturuyor 🤖
          </Text>
          {streamText ? (
            <View style={styles.streamBox}>
              <Text style={styles.streamText} numberOfLines={3}>{streamText}</Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }

  if (!schedule) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={styles.emptyScroll}>
          <LinearGradient
            colors={[theme.primarySurface, palette.offWhite]}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.emptyEmoji}>🗓️</Text>
          <Text style={styles.emptyTitle}>AI Program</Text>
          <Text style={styles.emptySubtitle}>
            {dog.name ? `${dog.name} için` : 'Köpeğin için'} kişiselleştirilmiş 7 günlük
            eğitim programı oluşturalım.
          </Text>

          <View style={styles.featureList}>
            {[
              { emoji: '🤖', text: 'Yapay zeka ile kişiselleştirilmiş' },
              { emoji: '📅', text: '7 günlük detaylı program' },
              { emoji: '⚡️', text: 'Her görevde XP kazan' },
              { emoji: '💡', text: 'Uzman eğitim ipuçları' },
            ].map((f) => (
              <View key={f.text} style={styles.featureRow}>
                <Text style={{ fontSize: 20 }}>{f.emoji}</Text>
                <Text style={styles.featureText}>{f.text}</Text>
              </View>
            ))}
          </View>

          <Button label="Program Oluştur 🚀" onPress={handleGenerate} style={styles.genBtn} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>AI Program 🤖</Text>
            <Text style={styles.weeklyGoal} numberOfLines={2}>{schedule.weeklyGoal}</Text>
          </View>
          <TouchableOpacity
            style={[styles.regenerateBtn, { borderColor: theme.primary }]}
            onPress={handleGenerate}
            activeOpacity={0.8}
          >
            <Text style={[styles.regenerateText, { color: theme.primary }]}>Yenile ↺</Text>
          </TouchableOpacity>
        </View>

        {/* Day selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayRow} contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}>
          {schedule.days.map((day) => (
            <DayCard key={day.day} day={day} selectedDay={selectedDay || schedule.days[0]?.day} onSelect={setSelectedDay} />
          ))}
        </ScrollView>

        {/* Day theme */}
        {currentDay && (
          <View style={styles.section}>
            <LinearGradient colors={[theme.primary + 'E0', theme.primaryDark]} style={styles.dayThemeBanner}>
              <Text style={styles.dayThemeLabel}>{currentDay.day}</Text>
              <Text style={styles.dayThemeTitle}>{currentDay.theme}</Text>
              <Text style={styles.dayThemeXP}>Toplam: {currentDay.totalXP} XP</Text>
            </LinearGradient>

            {/* Tasks grouped by time */}
            {(['morning', 'afternoon', 'evening'] as const).map((timeSlot) => {
              const tasks = currentDay.tasks.filter((t) => t.timeOfDay === timeSlot);
              if (tasks.length === 0) return null;
              return (
                <View key={timeSlot} style={styles.timeGroup}>
                  <Text style={styles.timeGroupLabel}>
                    {TIME_LABELS[timeSlot].emoji} {TIME_LABELS[timeSlot].label}
                  </Text>
                  <View style={styles.taskList}>
                    {tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        completed={completedTaskIds.includes(task.id)}
                        onComplete={completeTask}
                      />
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Tips */}
        {schedule.tips?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.tipsTitle}>💡 Uzman İpuçları</Text>
            <Card padding={16}>
              {schedule.tips.map((tip, i) => (
                <View key={i} style={[styles.tipRow, i < schedule.tips.length - 1 && styles.tipBorder]}>
                  <Text style={[styles.tipNumber, { color: theme.primary }]}>{i + 1}</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </Card>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.offWhite },
  scroll: { paddingBottom: 40 },

  loadingCenter: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  loadingTitle: { ...textStyles.h3, color: palette.gray900, marginTop: 20, marginBottom: 8 },
  loadingSubtitle: { ...textStyles.body, color: palette.gray600, textAlign: 'center' },
  streamBox: {
    marginTop: 20, backgroundColor: palette.gray50, borderRadius: 12,
    padding: 14, width: '100%',
  },
  streamText: { fontFamily: fonts.regular, fontSize: 12, color: palette.gray400 },

  emptyScroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyEmoji: { fontSize: 72, marginBottom: 16 },
  emptyTitle: { ...textStyles.h2, color: palette.gray900, marginBottom: 8 },
  emptySubtitle: { ...textStyles.body, color: palette.gray600, textAlign: 'center', marginBottom: 32 },
  featureList: { alignSelf: 'stretch', gap: 14, marginBottom: 36 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  featureText: { fontFamily: fonts.medium, fontSize: 15, color: palette.gray600 },
  genBtn: { alignSelf: 'stretch' },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
  title: { ...textStyles.h2, color: palette.gray900 },
  weeklyGoal: { ...textStyles.caption, color: palette.gray600, marginTop: 4 },
  regenerateBtn: {
    borderWidth: 1.5, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 8,
    marginTop: 4,
  },
  regenerateText: { fontFamily: fonts.bold, fontSize: 13 },

  dayRow: { marginBottom: 8 },
  dayChip: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: palette.white,
    borderWidth: 1.5,
    borderColor: palette.gray100,
    minWidth: 70,
  },
  dayShort: { fontFamily: fonts.bold, fontSize: 13, color: palette.gray600 },
  dayXP: { fontFamily: fonts.regular, fontSize: 11, color: palette.gray400, marginTop: 2 },

  section: { paddingHorizontal: 20, marginTop: 16 },
  dayThemeBanner: {
    borderRadius: 18, padding: 18, marginBottom: 16,
  },
  dayThemeLabel: { fontFamily: fonts.medium, fontSize: 12, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: 0.5 },
  dayThemeTitle: { fontFamily: fonts.extraBold, fontSize: 20, color: palette.white, marginTop: 4, marginBottom: 6 },
  dayThemeXP: { fontFamily: fonts.medium, fontSize: 13, color: 'rgba(255,255,255,0.8)' },

  timeGroup: { marginBottom: 20 },
  timeGroupLabel: { fontFamily: fonts.bold, fontSize: 13, color: palette.gray600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.4 },
  taskList: { gap: 10 },
  taskCard: {},
  taskDone: { opacity: 0.55 },
  taskRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  taskIconBg: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  taskTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  taskTitle: { fontFamily: fonts.bold, fontSize: 14, color: palette.gray900, flex: 1, marginRight: 8 },
  strikeThrough: { textDecorationLine: 'line-through', color: palette.gray400 },
  taskDesc: { fontFamily: fonts.regular, fontSize: 13, color: palette.gray600, lineHeight: 18 },
  taskMeta: { fontFamily: fonts.medium, fontSize: 12, color: palette.gray400, marginTop: 6 },
  xpPill: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  xpText: { fontFamily: fonts.bold, fontSize: 11 },
  doneCircle: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },

  tipsTitle: { ...textStyles.h4, color: palette.gray900, marginBottom: 10 },
  tipRow: { flexDirection: 'row', gap: 12, paddingVertical: 10 },
  tipBorder: { borderBottomWidth: 1, borderBottomColor: palette.gray50 },
  tipNumber: { fontFamily: fonts.extraBold, fontSize: 18, width: 24 },
  tipText: { fontFamily: fonts.regular, fontSize: 14, color: palette.gray600, flex: 1, lineHeight: 20 },
});
