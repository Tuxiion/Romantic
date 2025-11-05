
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { usePhotos } from '@/contexts/PhotoContext';

export default function ProfileScreen() {
  const { photos } = usePhotos();

  const totalMemories = photos.length;
  const oldestMemory = photos.length > 0 
    ? new Date(Math.min(...photos.map(p => p.date.getTime())))
    : null;
  const newestMemory = photos.length > 0
    ? new Date(Math.max(...photos.map(p => p.date.getTime())))
    : null;

  const frameStats = photos.reduce((acc, photo) => {
    acc[photo.frame] = (acc[photo.frame] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const favoriteFrame = Object.entries(frameStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
        ]}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="heart.circle.fill" size={80} color={colors.primary} />
          </View>
          <Text style={styles.name}>Love Album</Text>
          <Text style={styles.tagline}>Capturing moments that matter 💕</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <IconSymbol name="photo.fill" size={32} color={colors.primary} />
            <Text style={styles.statNumber}>{totalMemories}</Text>
            <Text style={styles.statLabel}>Memories</Text>
          </View>

          <View style={styles.statCard}>
            <IconSymbol name="calendar" size={32} color={colors.secondary} />
            <Text style={styles.statNumber}>
              {oldestMemory ? oldestMemory.getFullYear() : '—'}
            </Text>
            <Text style={styles.statLabel}>Since</Text>
          </View>

          <View style={styles.statCard}>
            <IconSymbol name="sparkles" size={32} color={colors.accent} />
            <Text style={styles.statNumber} numberOfLines={1} adjustsFontSizeToFit>
              {favoriteFrame}
            </Text>
            <Text style={styles.statLabel}>Fav Frame</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Album Details</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <IconSymbol name="clock.fill" size={20} color={colors.textSecondary} />
              <Text style={styles.infoLabel}>Latest Memory:</Text>
              <Text style={styles.infoValue}>
                {newestMemory ? newestMemory.toLocaleDateString() : 'No memories yet'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <IconSymbol name="calendar.badge.clock" size={20} color={colors.textSecondary} />
              <Text style={styles.infoLabel}>First Memory:</Text>
              <Text style={styles.infoValue}>
                {oldestMemory ? oldestMemory.toLocaleDateString() : 'No memories yet'}
              </Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              This romantic photo album helps you preserve and cherish your most precious moments together. 
              Add beautiful frames, event names, and dates to create a timeline of your love story.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(233, 30, 99, 0.15)',
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    boxShadow: '0px 4px 12px rgba(233, 30, 99, 0.15)',
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  aboutCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 4px 12px rgba(233, 30, 99, 0.15)',
    elevation: 4,
  },
  aboutText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
  },
});
