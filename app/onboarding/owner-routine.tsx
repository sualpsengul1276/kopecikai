import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../src/store/appStore';
import { Button } from '../../src/components/Button';
import { ProgressBar } from '../../src/components/ProgressBar';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

const WAKE_TIMES = ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00'];

const WORK_OPTIONS = [
  { value: 'home', label: 'Evden çalışıyorum', emoji: '🏠', desc: 'Gün boyu yanındayım' },
  { value: 'partTime', label: 'Yarı zamanlı', emoji: '🕐', desc: 'Kısmi süre dışarıdayım' },
  { value: 'fullTime', label: 'Tam zamanlı', emoji: '💼', desc: 'Çoğu gün dışarıdayım' },
];

const EXPERIENCE_OPTIONS = [
  { value: 'beginner', label: 'Yeni başlıyorum', emoji: '🌱' },
  { value: 'intermediate', label: 'Biraz deneyimliyim', emoji: '🌿' },
  { value: 'advanced', label: 'Deneyimliyim', emoji: '🌳' },
];

export default function OwnerRoutineScreen() {
  const router = useRouter();
  const { theme, setOwner } = useAppStore();
  const [wakeTime, setWakeTime] = useState('07:00');
  const [work, setWork] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);

  const canContinue = work !== null && experience !== null;

  const handleContinue = () => {
    setOwner({
      wakeUpTime: wakeTime,
      workSchedule: work as any,
      experienceLevel: experience as any,
    });
    router.push('/onboarding/goals');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ProgressBar progress={3 / 5} />
        <Text style={styles.step}>3 / 5</Text>
        <Text style={styles.title}>Rutinin nasıl? ☀️</Text>
        <Text style={styles.subtitle}>AI programını sana göre kurgulayacak.</Text>

        {/* Wake time */}
        <Text style={styles.sectionLabel}>Ne zaman uyanıyorsun?</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
          {WAKE_TIMES.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.timeChip, wakeTime === t && { backgroundColor: theme.primary, borderColor: theme.primary }]}
              onPress={() => setWakeTime(t)}
              activeOpacity={0.8}
            >
              <Text style={[styles.timeText, wakeTime === t && { color: palette.white }]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Work schedule */}
        <Text style={styles.sectionLabel}>Çalışma düzeni</Text>
        <View style={styles.optionList}>
          {WORK_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.optionCard,
                work === opt.value && { borderColor: theme.primary, backgroundColor: theme.primarySurface },
              ]}
              onPress={() => setWork(opt.value)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionEmoji}>{opt.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.optionLabel, work === opt.value && { color: theme.primary, fontFamily: fonts.bold }]}>
                  {opt.label}
                </Text>
                <Text style={styles.optionDesc}>{opt.desc}</Text>
              </View>
              {work === opt.value && <Text style={{ color: theme.primary, fontSize: 20 }}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>

        {/* Experience */}
        <Text style={styles.sectionLabel}>Köpek eğitimi deneyimin</Text>
        <View style={styles.expRow}>
          {EXPERIENCE_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.expCard,
                experience === opt.value && { borderColor: theme.primary, backgroundColor: theme.primarySurface },
              ]}
              onPress={() => setExperience(opt.value)}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 26, marginBottom: 6 }}>{opt.emoji}</Text>
              <Text style={[styles.expLabel, experience === opt.value && { color: theme.primary, fontFamily: fonts.bold }]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button label="Devam Et" onPress={handleContinue} disabled={!canContinue} style={styles.btn} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.offWhite },
  scroll: { padding: 24, paddingTop: 16 },
  step: { ...textStyles.captionMedium, color: palette.gray400, marginTop: 16, marginBottom: 8 },
  title: { ...textStyles.h2, color: palette.gray900, marginBottom: 6 },
  subtitle: { ...textStyles.body, color: palette.gray600, marginBottom: 28 },
  sectionLabel: {
    ...textStyles.captionMedium,
    color: palette.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 4,
  },
  timeScroll: { marginBottom: 24 },
  timeChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: palette.gray200,
    backgroundColor: palette.white,
    marginRight: 10,
  },
  timeText: { fontFamily: fonts.bold, fontSize: 15, color: palette.gray600 },
  optionList: { gap: 10, marginBottom: 24 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: palette.gray100,
    padding: 16,
    gap: 14,
  },
  optionEmoji: { fontSize: 26 },
  optionLabel: { fontFamily: fonts.medium, fontSize: 15, color: palette.gray900 },
  optionDesc: { fontFamily: fonts.regular, fontSize: 13, color: palette.gray400, marginTop: 2 },
  expRow: { flexDirection: 'row', gap: 10, marginBottom: 36 },
  expCard: {
    flex: 1,
    backgroundColor: palette.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: palette.gray100,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  expLabel: { fontFamily: fonts.medium, fontSize: 12, color: palette.gray600, textAlign: 'center' },
  btn: {},
});
