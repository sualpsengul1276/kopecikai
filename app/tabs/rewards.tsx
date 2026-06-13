import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../../src/store/appStore';
import { Card } from '../../src/components/Card';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

interface Reward {
  id: string;
  title: string;
  description: string;
  xpCost: number;
  emoji: string;
  brand: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  category: 'food' | 'toy' | 'subscription' | 'service';
}

const REWARDS: Reward[] = [
  {
    id: 'r1', title: '%10 Chewy İndirimi', description: 'Chewy.com alışverişinde geçerli indirim kodu',
    xpCost: 200, emoji: '🦴', brand: 'Chewy', tier: 'bronze', category: 'food',
  },
  {
    id: 'r2', title: 'BarkBox Örnek Kutu', description: 'Ücretsiz köpek maması ve oyuncak örnek kutusu',
    xpCost: 500, emoji: '📦', brand: 'BarkBox', tier: 'silver', category: 'subscription',
  },
  {
    id: 'r3', title: 'Premium Antrenman Modülü', description: 'Uygulama içi gelişmiş eğitim modüllerini aç',
    xpCost: 300, emoji: '🎓', brand: 'Köpecik', tier: 'silver', category: 'service',
  },
  {
    id: 'r4', title: '1 Ay BarkBox Üyeliği', description: 'Aylık köpek maması ve oyuncak aboneliği',
    xpCost: 1500, emoji: '🎁', brand: 'BarkBox', tier: 'gold', category: 'subscription',
  },
  {
    id: 'r5', title: 'Köpek Masajı Seansı', description: 'Profesyonel köpek masaj seansı kuponu',
    xpCost: 800, emoji: '💆', brand: 'PetSmart', tier: 'gold', category: 'service',
  },
  {
    id: 'r6', title: 'Yıllık BarkBox Üyeliği', description: '12 aylık premium köpek maması aboneliği',
    xpCost: 5000, emoji: '👑', brand: 'BarkBox', tier: 'platinum', category: 'subscription',
  },
];

const TIER_COLORS = {
  bronze: '#CD7F32',
  silver: palette.gray400,
  gold: palette.xpGold,
  platinum: '#E5E4E2',
};

const TIER_LABELS = {
  bronze: 'Bronz',
  silver: 'Gümüş',
  gold: 'Altın',
  platinum: 'Platin',
};

const XP_LEVELS = [
  { xp: 0, level: 1, title: 'Yavru Köpek 🐶' },
  { xp: 200, level: 2, title: 'Meraklı Köpek 🐕' },
  { xp: 500, level: 3, title: 'Çevik Köpek 🏃' },
  { xp: 1000, level: 4, title: 'Usta Köpek 🎯' },
  { xp: 2000, level: 5, title: 'Şampiyon 🏆' },
  { xp: 5000, level: 6, title: 'Efsane 👑' },
];

function getCurrentLevel(xp: number) {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].xp) return XP_LEVELS[i];
  }
  return XP_LEVELS[0];
}

function getNextLevel(xp: number) {
  for (const lvl of XP_LEVELS) {
    if (xp < lvl.xp) return lvl;
  }
  return null;
}

export default function RewardsScreen() {
  const { theme, xp, dog } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  const currentLevel = getCurrentLevel(xp);
  const nextLevel = getNextLevel(xp);
  const levelProgress = nextLevel
    ? (xp - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)
    : 1;

  const categories = ['all', 'food', 'toy', 'subscription', 'service'];
  const categoryLabels: Record<string, string> = {
    all: 'Tümü', food: '🦴 Mama', toy: '🎾 Oyuncak',
    subscription: '📦 Üyelik', service: '💆 Hizmet',
  };

  const filtered = selectedCategory === 'all'
    ? REWARDS
    : REWARDS.filter((r) => r.category === selectedCategory);

  const handleClaim = (reward: Reward) => {
    if (xp < reward.xpCost) {
      Alert.alert(
        'Yetersiz XP',
        `Bu ödül için ${reward.xpCost} XP gerekiyor. Şu an ${xp} XP\'in var.`
      );
      return;
    }
    Alert.alert(
      `${reward.emoji} ${reward.title}`,
      `${reward.xpCost} XP harcayarak bu ödülü almak istiyor musun?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Al!',
          onPress: () => {
            setClaimedIds((prev) => [...prev, reward.id]);
            Alert.alert('🎉 Tebrikler!', `${reward.title} başarıyla alındı! ${reward.brand} tarafından ödülün hazırlanıyor.`);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* XP & Level header */}
        <LinearGradient colors={[theme.primary, theme.primaryDark]} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.levelTitle}>{currentLevel.title}</Text>
              <Text style={styles.xpCount}>⚡️ {xp} XP</Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelNumber}>Lv.{currentLevel.level}</Text>
            </View>
          </View>

          {/* Progress bar */}
          {nextLevel && (
            <View style={styles.progressSection}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${levelProgress * 100}%` }]} />
              </View>
              <Text style={styles.progressLabel}>
                {nextLevel.xp - xp} XP → {nextLevel.title}
              </Text>
            </View>
          )}
        </LinearGradient>

        {/* Category filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catChip, selectedCategory === cat && { backgroundColor: theme.primary, borderColor: theme.primary }]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.8}
            >
              <Text style={[styles.catText, selectedCategory === cat && { color: palette.white }]}>
                {categoryLabels[cat]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Rewards grid */}
        <View style={styles.grid}>
          {filtered.map((reward) => {
            const canAfford = xp >= reward.xpCost;
            const claimed = claimedIds.includes(reward.id);
            const tierColor = TIER_COLORS[reward.tier];

            return (
              <Card key={reward.id} padding={16} style={!canAfford ? { ...styles.rewardCard, opacity: 0.7 } : styles.rewardCard}>
                <View style={styles.tierBadge}>
                  <Text style={[styles.tierText, { color: tierColor }]}>
                    {TIER_LABELS[reward.tier]}
                  </Text>
                </View>

                <Text style={styles.rewardEmoji}>{reward.emoji}</Text>
                <Text style={styles.rewardBrand}>{reward.brand}</Text>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDesc}>{reward.description}</Text>

                <View style={styles.rewardFooter}>
                  <View style={[styles.costPill, { backgroundColor: canAfford ? theme.primarySurface : palette.gray50 }]}>
                    <Text style={[styles.costText, { color: canAfford ? theme.primary : palette.gray400 }]}>
                      ⚡️ {reward.xpCost} XP
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.claimBtn,
                      claimed
                        ? { backgroundColor: palette.success }
                        : canAfford
                        ? { backgroundColor: theme.primary }
                        : { backgroundColor: palette.gray200 },
                    ]}
                    onPress={() => !claimed && handleClaim(reward)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.claimText}>
                      {claimed ? '✓ Alındı' : canAfford ? 'Al' : '🔒'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            );
          })}
        </View>

        {/* How it works */}
        <View style={styles.howSection}>
          <Card padding={18}>
            <Text style={styles.howTitle}>⚡️ XP Nasıl Kazanılır?</Text>
            {[
              { emoji: '🎯', text: 'Günlük antrenman görevleri (15–100 XP)' },
              { emoji: '🏃', text: 'GPS yürüyüş takibi (50 XP/km)' },
              { emoji: '📋', text: 'Haftalık/aylık görevler (150–600 XP)' },
              { emoji: '🔥', text: 'Günlük seri bonusu (+10 XP/gün)' },
            ].map((item) => (
              <View key={item.text} style={styles.howRow}>
                <Text style={{ fontSize: 18 }}>{item.emoji}</Text>
                <Text style={styles.howText}>{item.text}</Text>
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.offWhite },
  scroll: { paddingBottom: 40 },

  header: {
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24,
    borderBottomLeftRadius: 28, borderBottomRightRadius: 28, marginBottom: 4,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  levelTitle: { fontFamily: fonts.medium, fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  xpCount: { fontFamily: fonts.black, fontSize: 32, color: palette.white },
  levelBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16,
    paddingHorizontal: 16, paddingVertical: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  levelNumber: { fontFamily: fonts.extraBold, fontSize: 18, color: palette.white },
  progressSection: {},
  progressTrack: { height: 8, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: '100%', backgroundColor: palette.white, borderRadius: 4 },
  progressLabel: { fontFamily: fonts.medium, fontSize: 12, color: 'rgba(255,255,255,0.8)' },

  catScroll: { marginVertical: 16 },
  catChip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 12, borderWidth: 1.5, borderColor: palette.gray200,
    backgroundColor: palette.white,
  },
  catText: { fontFamily: fonts.bold, fontSize: 13, color: palette.gray600 },

  grid: { paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  rewardCard: { width: '47%' },
  rewardLocked: { opacity: 0.7 },
  tierBadge: { marginBottom: 8 },
  tierText: { fontFamily: fonts.bold, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 },
  rewardEmoji: { fontSize: 36, marginBottom: 8 },
  rewardBrand: { fontFamily: fonts.medium, fontSize: 11, color: palette.gray400, textTransform: 'uppercase', letterSpacing: 0.4 },
  rewardTitle: { fontFamily: fonts.bold, fontSize: 14, color: palette.gray900, marginTop: 2, marginBottom: 6 },
  rewardDesc: { fontFamily: fonts.regular, fontSize: 12, color: palette.gray600, lineHeight: 17, marginBottom: 14 },
  rewardFooter: { gap: 8 },
  costPill: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  costText: { fontFamily: fonts.bold, fontSize: 12 },
  claimBtn: {
    borderRadius: 10, paddingVertical: 8, alignItems: 'center',
  },
  claimText: { fontFamily: fonts.bold, fontSize: 13, color: palette.white },

  howSection: { paddingHorizontal: 20, marginTop: 20 },
  howTitle: { fontFamily: fonts.bold, fontSize: 16, color: palette.gray900, marginBottom: 14 },
  howRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
  howText: { fontFamily: fonts.regular, fontSize: 14, color: palette.gray600, flex: 1 },
});
