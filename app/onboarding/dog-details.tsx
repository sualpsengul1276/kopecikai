import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore, DogGender, DogSize } from '../../src/store/appStore';
import { Button } from '../../src/components/Button';
import { ProgressBar } from '../../src/components/ProgressBar';
import { Card } from '../../src/components/Card';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

const AGE_OPTIONS = [
  { label: '0–6 ay', value: 3 },
  { label: '6–12 ay', value: 9 },
  { label: '1–2 yaş', value: 18 },
  { label: '2–5 yaş', value: 36 },
  { label: '5+ yaş', value: 72 },
];

const SIZE_OPTIONS: { label: string; emoji: string; value: DogSize }[] = [
  { label: 'Küçük', emoji: '🐩', value: 'small' },
  { label: 'Orta', emoji: '🐕', value: 'medium' },
  { label: 'Büyük', emoji: '🦮', value: 'large' },
];

const GENDER_OPTIONS: { label: string; emoji: string; value: DogGender; color: string }[] = [
  { label: 'Erkek', emoji: '♂️', value: 'male', color: palette.blue },
  { label: 'Dişi', emoji: '♀️', value: 'female', color: palette.mauve },
];

export default function DogDetailsScreen() {
  const router = useRouter();
  const { theme, setDog, setDogGender, dog } = useAppStore();
  const [age, setAge] = useState<number | null>(null);
  const [size, setSize] = useState<DogSize | null>(null);
  const [gender, setGender] = useState<DogGender | null>(null);

  const canContinue = age !== null && size !== null && gender !== null;

  const handleGender = (g: DogGender) => {
    setGender(g);
    setDogGender(g);
  };

  const handleContinue = () => {
    if (age && size && gender) {
      setDog({ age, size });
      router.push('/onboarding/owner-routine');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ProgressBar progress={2 / 5} />
        <Text style={styles.step}>2 / 5</Text>
        <Text style={styles.title}>{dog.name || 'Köpeğin'} hakkında</Text>
        <Text style={styles.subtitle}>Doğru program için birkaç detay.</Text>

        {/* Gender */}
        <Text style={styles.sectionLabel}>Cinsiyet</Text>
        <View style={styles.genderRow}>
          {GENDER_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.genderCard,
                gender === opt.value && { borderColor: opt.color, backgroundColor: gender === 'female' ? palette.mauveSurface : palette.blueSurface },
              ]}
              onPress={() => handleGender(opt.value)}
              activeOpacity={0.8}
            >
              <Text style={styles.genderEmoji}>{opt.emoji}</Text>
              <Text style={[styles.genderLabel, gender === opt.value && { color: opt.color, fontFamily: fonts.bold }]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Age */}
        <Text style={styles.sectionLabel}>Yaş</Text>
        <View style={styles.chipGrid}>
          {AGE_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.chip, age === opt.value && { backgroundColor: theme.primary, borderColor: theme.primary }]}
              onPress={() => setAge(opt.value)}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipText, age === opt.value && { color: palette.white }]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Size */}
        <Text style={styles.sectionLabel}>Boy</Text>
        <View style={styles.sizeRow}>
          {SIZE_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.sizeCard, size === opt.value && { borderColor: theme.primary, backgroundColor: theme.primarySurface }]}
              onPress={() => setSize(opt.value)}
              activeOpacity={0.8}
            >
              <Text style={styles.sizeEmoji}>{opt.emoji}</Text>
              <Text style={[styles.sizeLabel, size === opt.value && { color: theme.primary, fontFamily: fonts.bold }]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          label="Devam Et"
          onPress={handleContinue}
          disabled={!canContinue}
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
  sectionLabel: {
    ...textStyles.captionMedium,
    color: palette.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 4,
  },

  genderRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  genderCard: {
    flex: 1,
    backgroundColor: palette.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: palette.gray100,
    alignItems: 'center',
    paddingVertical: 20,
  },
  genderEmoji: { fontSize: 32, marginBottom: 8 },
  genderLabel: { fontFamily: fonts.medium, fontSize: 15, color: palette.gray600 },

  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: palette.gray200,
    backgroundColor: palette.white,
  },
  chipText: { fontFamily: fonts.medium, fontSize: 14, color: palette.gray600 },

  sizeRow: { flexDirection: 'row', gap: 10, marginBottom: 36 },
  sizeCard: {
    flex: 1,
    backgroundColor: palette.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: palette.gray100,
    alignItems: 'center',
    paddingVertical: 18,
  },
  sizeEmoji: { fontSize: 28, marginBottom: 6 },
  sizeLabel: { fontFamily: fonts.medium, fontSize: 13, color: palette.gray600 },

  btn: {},
});
