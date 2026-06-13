import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../src/store/appStore';
import { Button } from '../../src/components/Button';
import { ProgressBar } from '../../src/components/ProgressBar';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

const BREEDS = [
  'Golden Retriever', 'Labrador', 'Alman Çoban', 'Fransız Bulldog',
  'Beagle', 'Poodle', 'Husky', 'Rottweiler', 'Yorkshire Terrier', 'Diğer',
];

export default function DogNameScreen() {
  const router = useRouter();
  const { theme, setDog } = useAppStore();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [showBreeds, setShowBreeds] = useState(false);

  const canContinue = name.trim().length > 0;

  const handleContinue = () => {
    setDog({ name: name.trim(), breed });
    router.push('/onboarding/dog-details');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <ProgressBar progress={1 / 5} />

          <Text style={styles.step}>1 / 5</Text>
          <Text style={styles.title}>Köpeğin adı ne? 🐶</Text>
          <Text style={styles.subtitle}>Ona özel bir program hazırlayacağız.</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>İsim</Text>
            <TextInput
              style={[styles.input, { borderColor: name ? theme.primary : palette.gray200 }]}
              placeholder="örn. Karamel"
              placeholderTextColor={palette.gray400}
              value={name}
              onChangeText={setName}
              autoFocus
              returnKeyType="done"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Irk (isteğe bağlı)</Text>
            <TouchableOpacity
              style={[styles.select, { borderColor: breed ? theme.primary : palette.gray200 }]}
              onPress={() => setShowBreeds(!showBreeds)}
              activeOpacity={0.8}
            >
              <Text style={[styles.selectText, { color: breed ? palette.gray900 : palette.gray400 }]}>
                {breed || 'Irk seçin'}
              </Text>
              <Text style={{ fontSize: 16 }}>{showBreeds ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {showBreeds && (
              <View style={styles.dropdown}>
                {BREEDS.map((b) => (
                  <TouchableOpacity
                    key={b}
                    style={[styles.dropdownItem, b === breed && { backgroundColor: theme.primarySurface }]}
                    onPress={() => { setBreed(b); setShowBreeds(false); }}
                  >
                    <Text style={[styles.dropdownText, b === breed && { color: theme.primary, fontFamily: fonts.bold }]}>
                      {b}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <Button label="Devam Et" onPress={handleContinue} disabled={!canContinue} style={styles.btn} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.offWhite },
  scroll: { padding: 24, paddingTop: 16 },
  step: { ...textStyles.captionMedium, color: palette.gray400, marginTop: 16, marginBottom: 8 },
  title: { ...textStyles.h2, color: palette.gray900, marginBottom: 6 },
  subtitle: { ...textStyles.body, color: palette.gray600, marginBottom: 32 },
  inputContainer: { marginBottom: 20 },
  label: { ...textStyles.captionMedium, color: palette.gray600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: palette.white,
    borderRadius: 14,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.medium,
    fontSize: 16,
    color: palette.gray900,
  },
  select: {
    backgroundColor: palette.white,
    borderRadius: 14,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: { fontFamily: fonts.medium, fontSize: 16 },
  dropdown: {
    backgroundColor: palette.white,
    borderRadius: 14,
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  dropdownItem: { paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: palette.gray50 },
  dropdownText: { fontFamily: fonts.regular, fontSize: 15, color: palette.gray900 },
  footer: { marginTop: 32 },
  btn: {},
});
