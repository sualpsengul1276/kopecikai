import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../src/store/appStore';
import { Card } from '../../src/components/Card';
import { fonts, textStyles } from '../../src/theme/typography';
import { palette } from '../../src/theme/colors';

const FEED = [
  {
    id: '1',
    user: 'Selin K.',
    dog: 'Pamuk',
    avatar: '🐩',
    content: 'Pamuk bugün ilk kez "yere yat" komutunu öğrendi! 🎉',
    image: null,
    likes: 24,
    comments: 5,
    time: '2 saat önce',
    xp: 50,
    badge: '🏆 Yeni Başarı',
  },
  {
    id: '2',
    user: 'Mert A.',
    dog: 'Karamel',
    avatar: '🐕',
    content: '5 km sabah yürüyüşü tamamlandı! Karamel çok mutluydu ☀️',
    image: null,
    likes: 41,
    comments: 8,
    time: '4 saat önce',
    xp: 30,
    badge: null,
  },
  {
    id: '3',
    user: 'Zeynep T.',
    dog: 'Şeker',
    avatar: '🦊',
    content: '21 günlük seri! Şeker artık gerçek bir atlet 🔥',
    image: null,
    likes: 67,
    comments: 12,
    time: 'Dün',
    xp: 100,
    badge: '🔥 21 Gün Serisi',
  },
];

export default function SocialScreen() {
  const { theme } = useAppStore();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Topluluk 🐾</Text>
          <TouchableOpacity style={[styles.postBtn, { backgroundColor: theme.primary }]}>
            <Text style={styles.postBtnText}>+ Paylaş</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.feedList}>
          {FEED.map((post) => (
            <Card key={post.id} padding={16} style={styles.post}>
              {/* Post header */}
              <View style={styles.postHeader}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatar}>{post.avatar}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.userName}>{post.user}</Text>
                  <Text style={styles.postMeta}>{post.dog} · {post.time}</Text>
                </View>
                <View style={[styles.xpBadge, { backgroundColor: theme.primarySurface }]}>
                  <Text style={[styles.xpBadgeText, { color: theme.primary }]}>+{post.xp} XP</Text>
                </View>
              </View>

              {post.badge && (
                <View style={styles.achievementBadge}>
                  <Text style={styles.achievementText}>{post.badge}</Text>
                </View>
              )}

              <Text style={styles.content}>{post.content}</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionText}>❤️ {post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionText}>💬 {post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionText}>🔁 Paylaş</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.offWhite },
  scroll: { paddingBottom: 32 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: { ...textStyles.h2, color: palette.gray900 },
  postBtn: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  postBtnText: { fontFamily: fonts.bold, color: palette.white, fontSize: 14 },
  feedList: { paddingHorizontal: 20, gap: 12, marginTop: 12 },
  post: {},
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatarContainer: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: palette.gray100,
    alignItems: 'center', justifyContent: 'center',
  },
  avatar: { fontSize: 26 },
  userName: { fontFamily: fonts.bold, fontSize: 14, color: palette.gray900 },
  postMeta: { fontFamily: fonts.regular, fontSize: 12, color: palette.gray400, marginTop: 2 },
  xpBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  xpBadgeText: { fontFamily: fonts.bold, fontSize: 12 },
  achievementBadge: {
    backgroundColor: palette.xpGoldLight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  achievementText: { fontFamily: fonts.bold, fontSize: 12, color: palette.xpGold },
  content: { fontFamily: fonts.regular, fontSize: 15, color: palette.gray900, lineHeight: 22, marginBottom: 14 },
  actions: { flexDirection: 'row', gap: 20 },
  actionBtn: { flexDirection: 'row', alignItems: 'center' },
  actionText: { fontFamily: fonts.medium, fontSize: 14, color: palette.gray600 },
});
