import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../../src/store/appStore';
import { useGPSWalk, formatDuration, WalkStats } from '../../src/hooks/useGPSWalk';
import { Card } from '../../src/components/Card';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

function XPCalculator(stats: WalkStats): number {
  const distanceXP = Math.floor(stats.distance * 50);
  const durationXP = Math.floor(stats.duration / 60) * 5;
  return Math.min(distanceXP + durationXP, 300);
}

function StatBox({ label, value, unit, emoji }: { label: string; value: string; unit: string; emoji: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statUnit}>{unit}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function WalkScreen() {
  const { theme, dog, addWalk, walks } = useAppStore();
  const { isTracking, stats, error, hasPermission, startTracking, stopTracking } = useGPSWalk();
  const [completedWalk, setCompletedWalk] = useState<WalkStats | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isTracking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.12, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isTracking]);

  const handleStop = () => {
    const finalStats = stopTracking();
    if (!finalStats || finalStats.distance < 0.01) {
      Alert.alert('Yürüyüş çok kısa', 'En az 10 metre yürümelisiniz.');
      return;
    }
    const xpEarned = XPCalculator(finalStats);
    addWalk({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      stats: finalStats,
      xpEarned,
    });
    setCompletedWalk(finalStats);
  };

  const handleReset = () => {
    setCompletedWalk(null);
  };

  // Completed screen
  if (completedWalk) {
    const xpEarned = XPCalculator(completedWalk);
    return (
      <View style={styles.container}>
        <LinearGradient colors={[theme.primary, theme.primaryDark]} style={StyleSheet.absoluteFill} />
        <SafeAreaView style={styles.successInner} edges={['top', 'bottom']}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successTitle}>Harika Yürüyüş!</Text>
          <Text style={styles.successSubtitle}>{dog.name || 'Köpeğin'} muhteşemdi!</Text>

          <View style={styles.statsGrid}>
            <StatBox
              emoji="📍"
              label="Mesafe"
              value={completedWalk.distance.toFixed(2)}
              unit="km"
            />
            <StatBox
              emoji="⏱️"
              label="Süre"
              value={formatDuration(completedWalk.duration)}
              unit=""
            />
            <StatBox
              emoji="🔥"
              label="Kalori"
              value={completedWalk.calories.toString()}
              unit="kcal"
            />
            <StatBox
              emoji="⚡️"
              label="Kazanılan"
              value={`+${xpEarned}`}
              unit="XP"
            />
          </View>

          <TouchableOpacity style={styles.doneBtn} onPress={handleReset} activeOpacity={0.85}>
            <Text style={[styles.doneBtnText, { color: theme.primary }]}>Harika! 🐾</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>GPS Yürüyüş 🗺️</Text>
          {hasPermission === false && (
            <Text style={styles.permError}>⚠️ Konum izni gerekli</Text>
          )}
        </View>

        {/* Main tracking card */}
        <View style={styles.trackingSection}>
          <LinearGradient
            colors={isTracking ? [theme.primary, theme.primaryDark] : [palette.gray100, palette.gray200]}
            style={styles.trackingCard}
          >
            {/* Timer */}
            <Text style={[styles.timer, !isTracking && { color: palette.gray400 }]}>
              {formatDuration(isTracking ? stats.duration : 0)}
            </Text>
            <Text style={[styles.timerLabel, !isTracking && { color: palette.gray400 }]}>
              {isTracking ? 'Yürüyüş süresi' : 'Hazır'}
            </Text>

            {/* Stats row */}
            <View style={styles.liveStats}>
              <View style={styles.liveStat}>
                <Text style={[styles.liveStatValue, !isTracking && { color: palette.gray400 }]}>
                  {stats.distance.toFixed(2)}
                </Text>
                <Text style={[styles.liveStatLabel, !isTracking && { color: palette.gray400 }]}>km</Text>
              </View>
              <View style={styles.liveStatDivider} />
              <View style={styles.liveStat}>
                <Text style={[styles.liveStatValue, !isTracking && { color: palette.gray400 }]}>
                  {stats.distance > 0 ? stats.pace.toFixed(1) : '0.0'}
                </Text>
                <Text style={[styles.liveStatLabel, !isTracking && { color: palette.gray400 }]}>min/km</Text>
              </View>
              <View style={styles.liveStatDivider} />
              <View style={styles.liveStat}>
                <Text style={[styles.liveStatValue, !isTracking && { color: palette.gray400 }]}>
                  {stats.calories}
                </Text>
                <Text style={[styles.liveStatLabel, !isTracking && { color: palette.gray400 }]}>kcal</Text>
              </View>
            </View>

            {/* Button */}
            <Animated.View style={{ transform: [{ scale: isTracking ? pulseAnim : 1 }] }}>
              <TouchableOpacity
                style={[styles.mainBtn, isTracking ? styles.stopBtn : { backgroundColor: palette.white }]}
                onPress={isTracking ? handleStop : startTracking}
                activeOpacity={0.85}
              >
                <Text style={[styles.mainBtnIcon, { color: isTracking ? palette.white : theme.primary }]}>
                  {isTracking ? '⏹' : '▶'}
                </Text>
                <Text style={[styles.mainBtnText, { color: isTracking ? palette.white : theme.primary }]}>
                  {isTracking ? 'Bitir' : 'Başlat'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </View>

        {/* XP preview */}
        {isTracking && (
          <View style={styles.section}>
            <Card padding={14}>
              <View style={styles.xpPreviewRow}>
                <Text style={{ fontSize: 20 }}>⚡️</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.xpPreviewTitle}>Tahmini XP</Text>
                  <Text style={styles.xpPreviewSub}>Mesafe + süre bonusu</Text>
                </View>
                <Text style={[styles.xpPreviewValue, { color: theme.primary }]}>
                  +{XPCalculator(stats)} XP
                </Text>
              </View>
            </Card>
          </View>
        )}

        {/* Walk history */}
        {walks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Geçmiş Yürüyüşler</Text>
            <View style={styles.historyList}>
              {walks.slice(0, 5).map((w) => (
                <Card key={w.id} padding={14} style={styles.historyCard}>
                  <View style={styles.historyRow}>
                    <Text style={{ fontSize: 26 }}>🐾</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.historyDate}>
                        {new Date(w.date).toLocaleDateString('tr-TR', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </Text>
                      <Text style={styles.historyStats}>
                        {w.stats.distance.toFixed(2)} km · {formatDuration(w.stats.duration)}
                      </Text>
                    </View>
                    <View style={[styles.historyXP, { backgroundColor: theme.primarySurface }]}>
                      <Text style={[styles.historyXPText, { color: theme.primary }]}>+{w.xpEarned} XP</Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
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
  permError: { fontFamily: fonts.medium, fontSize: 13, color: palette.error, marginTop: 6 },

  trackingSection: { paddingHorizontal: 20, marginTop: 12 },
  trackingCard: {
    borderRadius: 28, padding: 28, alignItems: 'center', gap: 20,
  },
  timer: {
    fontFamily: fonts.black, fontSize: 56, color: palette.white, letterSpacing: -1,
  },
  timerLabel: { fontFamily: fonts.medium, fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: -16 },
  liveStats: { flexDirection: 'row', alignItems: 'center', gap: 0, width: '100%' },
  liveStat: { flex: 1, alignItems: 'center' },
  liveStatDivider: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.25)' },
  liveStatValue: { fontFamily: fonts.extraBold, fontSize: 22, color: palette.white },
  liveStatLabel: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  mainBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 40, paddingVertical: 16,
    borderRadius: 50,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 6,
  },
  stopBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)' },
  mainBtnIcon: { fontSize: 22 },
  mainBtnText: { fontFamily: fonts.extraBold, fontSize: 18 },

  section: { paddingHorizontal: 20, marginTop: 16 },
  sectionTitle: { ...textStyles.h4, color: palette.gray900, marginBottom: 12 },
  xpPreviewRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  xpPreviewTitle: { fontFamily: fonts.bold, fontSize: 14, color: palette.gray900 },
  xpPreviewSub: { fontFamily: fonts.regular, fontSize: 12, color: palette.gray400 },
  xpPreviewValue: { fontFamily: fonts.extraBold, fontSize: 20 },

  historyList: { gap: 10 },
  historyCard: {},
  historyRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  historyDate: { fontFamily: fonts.bold, fontSize: 14, color: palette.gray900 },
  historyStats: { fontFamily: fonts.regular, fontSize: 13, color: palette.gray400, marginTop: 2 },
  historyXP: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  historyXPText: { fontFamily: fonts.bold, fontSize: 13 },

  // Completed
  successInner: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28 },
  successEmoji: { fontSize: 80, marginBottom: 16 },
  successTitle: { fontFamily: fonts.black, fontSize: 36, color: palette.white, marginBottom: 8 },
  successSubtitle: { fontFamily: fonts.medium, fontSize: 17, color: 'rgba(255,255,255,0.8)', marginBottom: 40 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, width: '100%', marginBottom: 40 },
  statBox: {
    width: '47%', backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 18, padding: 18, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
  },
  statEmoji: { fontSize: 28, marginBottom: 6 },
  statValue: { fontFamily: fonts.black, fontSize: 28, color: palette.white },
  statUnit: { fontFamily: fonts.medium, fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  statLabel: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  doneBtn: {
    backgroundColor: palette.white, borderRadius: 16,
    paddingHorizontal: 48, paddingVertical: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 12, elevation: 5,
  },
  doneBtnText: { fontFamily: fonts.extraBold, fontSize: 18 },
});
