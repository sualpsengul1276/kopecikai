import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette } from '../../src/theme/colors';
import { fonts, textStyles } from '../../src/theme/typography';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A3B6E', '#2F6FD0', '#5B9AE8']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.inner}>
        <View style={styles.topSection}>
          <Text style={styles.emoji}>🐾</Text>
          <Text style={styles.appName}>Köpecik</Text>
          <Text style={styles.tagline}>Köpeğini eğit, birlikte büyü</Text>
        </View>

        <View style={styles.illustration}>
          <Text style={styles.dogEmoji}>🐕</Text>
          <View style={styles.bubbleRow}>
            <View style={styles.bubble}><Text style={styles.bubbleText}>XP +50 🎉</Text></View>
            <View style={[styles.bubble, styles.bubble2]}><Text style={styles.bubbleText}>Streak 🔥 7</Text></View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => router.push('/onboarding/dog-name')}
            activeOpacity={0.88}
          >
            <Text style={styles.startLabel}>Başlayalım →</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} activeOpacity={0.7}>
            <Text style={styles.loginLabel}>Zaten hesabım var</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 28 },
  topSection: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 20 },
  emoji: { fontSize: 48, marginBottom: 12 },
  appName: {
    fontFamily: fonts.black,
    fontSize: 42,
    color: palette.white,
    letterSpacing: -0.5,
  },
  tagline: {
    fontFamily: fonts.medium,
    fontSize: 17,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    textAlign: 'center',
  },
  illustration: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dogEmoji: { fontSize: 120 },
  bubbleRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  bubble2: { marginTop: -16 },
  bubbleText: {
    fontFamily: fonts.bold,
    color: palette.white,
    fontSize: 14,
  },
  bottomSection: { paddingBottom: 24 },
  startBtn: {
    backgroundColor: palette.white,
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  startLabel: {
    fontFamily: fonts.extraBold,
    fontSize: 17,
    color: palette.blue,
  },
  loginBtn: { alignItems: 'center', paddingVertical: 8 },
  loginLabel: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
  },
});
