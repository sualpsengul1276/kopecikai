import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../src/store/appStore';
import { Button } from '../../src/components/Button';
import { ProgressBar } from '../../src/components/ProgressBar';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

const GOALS = [
  { id: 'basics', label: 'Temel komutlar', emoji: '🎯', desc: 'Otur, dur, gel' },
  { id: 'leash', label: 'Tasma eğitimi', emoji: '🦮', desc: 'Çekmeden yürüyüş' },
  { id: 'social', label: 'Sosyalleşme', emoji: '🐾', desc: 'İnsan & köpek uyumu' },
  { id: 'fitness', label: 'Fiziksel kondisyon', emoji: '🏃', desc: 'Günlük egzersiz rutini' },
  { id: 'tricks', label: 'Numaralar', emoji: '✨', desc: 'Eğlenceli öğrenme' },
  { id: 'calm', label: 'Sakinlik & kontrol', emoji: '🧘', desc: 'Kaygı & reaktivite' },
];

export default function GoalsScreen() {
  const router = useRouter();
  const { theme, setOwner } = useAppStore();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    setOwner({ goals: selected });
    router.push('/onboarding/complete');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ProgressBar progress={4 / 5} />
        <Text style={styles.step}>4 / 5</Text>
        <Text style={styles.title}>Hedeflerin neler? 🎯</Text>
        <Text style={styles.subtitle}>Birden fazla seçebilirsin.</Text>

        <View style={styles.grid}>
          {GOALS.map((goal) => {
            const active = selected.includes(goal.id);
            return (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  active && { borderColor: theme.primary, backgroundColor: theme.primarySurface },
                ]}
                onPress={() => toggle(goal.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                <Text style={[styles.goalLabel, active && { color: theme.primary, fontFamily: fonts.bold }]}>
                  {goal.label}
                </Text>
                <Text style={styles.goalDesc}>{goal.desc}</Text>
                {active && (
                  <View style={[styles.check, { backgroundColor: theme.primary }]}>
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Button
          label={selected.length === 0 ? 'Atla' : `Devam Et (${selected.length})`}
          onPress={handleContinue}
          style={styles.btn}
        />
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  goalCard: {
    width: '47%',
    backgroundColor: palette.white,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: palette.gray100,
    padding: 16,
    position: 'relative',
  },
  goalEmoji: { fontSize: 28, marginBottom: 8 },
  goalLabel: { fontFamily: fonts.medium, fontSize: 14, color: palette.gray900, marginBottom: 4 },
  goalDesc: { fontFamily: fonts.regular, fontSize: 12, color: palette.gray400 },
  check: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: { color: palette.white, fontSize: 12, fontFamily: fonts.bold },
  btn: {},
});
