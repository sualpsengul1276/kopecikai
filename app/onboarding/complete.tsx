import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../../src/store/appStore';
import { Button } from '../../src/components/Button';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

export default function CompleteScreen() {
  const router = useRouter();
  const { theme, dog, completeOnboarding } = useAppStore();
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 6 }),
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
    ]).start();
  }, []);

  const handleStart = () => {
    completeOnboarding();
    router.replace('/tabs');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.primaryDark, theme.primary, theme.primaryLight]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.inner}>
        <Animated.View style={[styles.emojiContainer, { transform: [{ scale }] }]}>
          <Text style={styles.mainEmoji}>🎉</Text>
        </Animated.View>

        <Animated.View style={{ opacity }}>
          <Text style={styles.title}>Hazırsın!</Text>
          <Text style={styles.subtitle}>
            {dog.name ? `${dog.name} için` : 'Köpeğin için'} kişisel eğitim programı oluşturuldu.
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>⚡️</Text>
              <Text style={styles.statValue}>0 XP</Text>
              <Text style={styles.statLabel}>Puan</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statValue}>0 Gün</Text>
              <Text style={styles.statLabel}>Seri</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>🏆</Text>
              <Text style={styles.statValue}>Yeni</Text>
              <Text style={styles.statLabel}>Seviye</Text>
            </View>
          </View>

          <Button
            label={`${dog.name || 'Köpek'}le Başla! 🐾`}
            onPress={handleStart}
            style={styles.btn}
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 28, justifyContent: 'center' },
  emojiContainer: { alignItems: 'center', marginBottom: 24 },
  mainEmoji: { fontSize: 90 },
  title: {
    fontFamily: fonts.black,
    fontSize: 38,
    color: palette.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: 17,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 25,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  statEmoji: { fontSize: 24, marginBottom: 6 },
  statValue: { fontFamily: fonts.extraBold, fontSize: 16, color: palette.white },
  statLabel: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  btn: {},
});
