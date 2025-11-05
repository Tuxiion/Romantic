
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { Photo } from '@/types/Photo';
import { frames } from '@/data/frames';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';
import * as Haptics from 'expo-haptics';

interface PhotoCardProps {
  photo: Photo;
  onPress?: () => void;
  onDelete?: () => void;
}

export default function PhotoCard({ photo, onPress, onDelete }: PhotoCardProps) {
  const frame = frames[photo.frame];
  const dateStr = photo.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDelete = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onDelete?.();
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.frameContainer, { borderColor: frame.color }]}>
        <Image source={{ uri: photo.uri }} style={styles.image} resizeMode="cover" />
        
        {/* Frame decoration corners */}
        <View style={[styles.corner, styles.topLeft, { borderColor: frame.color }]} />
        <View style={[styles.corner, styles.topRight, { borderColor: frame.color }]} />
        <View style={[styles.corner, styles.bottomLeft, { borderColor: frame.color }]} />
        <View style={[styles.corner, styles.bottomRight, { borderColor: frame.color }]} />
        
        {/* Delete button */}
        {onDelete && (
          <Pressable onPress={handleDelete} style={styles.deleteButton}>
            <View style={styles.deleteButtonInner}>
              <IconSymbol name="trash.fill" size={16} color="#FFFFFF" />
            </View>
          </Pressable>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.eventRow}>
          <IconSymbol name={frame.icon} size={16} color={frame.color} />
          <Text style={styles.eventName} numberOfLines={1}>{photo.eventName}</Text>
        </View>
        <Text style={styles.date}>{dateStr}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  frameContainer: {
    position: 'relative',
    borderRadius: 16,
    borderWidth: 8,
    overflow: 'hidden',
    backgroundColor: colors.card,
    boxShadow: '0px 6px 16px rgba(233, 30, 99, 0.2)',
    elevation: 6,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: colors.highlight,
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderWidth: 3,
  },
  topLeft: {
    top: 8,
    left: 8,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 8,
    right: 8,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 8,
    left: 8,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 8,
    right: 8,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  deleteButtonInner: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  infoContainer: {
    marginTop: 12,
    paddingHorizontal: 4,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
