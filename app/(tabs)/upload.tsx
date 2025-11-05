
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import FrameSelector from '@/components/FrameSelector';
import { FrameType } from '@/types/Photo';
import { usePhotos } from '@/contexts/PhotoContext';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function UploadScreen() {
  const { addPhoto } = usePhotos();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [eventName, setEventName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<FrameType>('hearts');

  const pickImage = async () => {
    console.log('Requesting image picker permissions...');
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      console.log('Image selected:', result.assets[0].uri);
      setImageUri(result.assets[0].uri);
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      console.log('Date selected:', date.toLocaleDateString());
    }
  };

  const handleSave = () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please select an image first!');
      return;
    }

    if (!eventName.trim()) {
      Alert.alert('No Event Name', 'Please enter an event name!');
      return;
    }

    const newPhoto = {
      id: Date.now().toString(),
      uri: imageUri,
      eventName: eventName.trim(),
      date: selectedDate,
      frame: selectedFrame,
      createdAt: new Date(),
    };

    console.log('Saving photo:', newPhoto.eventName);
    addPhoto(newPhoto);
    
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    // Reset form
    setImageUri(null);
    setEventName('');
    setSelectedDate(new Date());
    setSelectedFrame('hearts');

    Alert.alert(
      'Success!',
      'Your romantic memory has been saved! 💕',
      [
        {
          text: 'View Album',
          onPress: () => router.push('/(tabs)/(home)/'),
        },
        {
          text: 'Add Another',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
        ]}
      >
        <View style={styles.header}>
          <IconSymbol name="heart.fill" size={32} color={colors.primary} />
          <Text style={styles.title}>Add Romantic Memory</Text>
        </View>

        {/* Image Picker */}
        <Pressable onPress={pickImage} style={styles.imagePickerContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <IconSymbol name="photo.fill" size={48} color={colors.textSecondary} />
              <Text style={styles.placeholderText}>Tap to select a photo</Text>
            </View>
          )}
        </Pressable>

        {/* Event Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Event Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Our First Date, Anniversary..."
            placeholderTextColor={colors.textSecondary}
            value={eventName}
            onChangeText={setEventName}
          />
        </View>

        {/* Date Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
            <IconSymbol name="calendar" size={20} color={colors.primary} />
            <Text style={styles.dateText}>
              {selectedDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </Pressable>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        {/* Frame Selector */}
        <FrameSelector selectedFrame={selectedFrame} onSelectFrame={setSelectedFrame} />

        {/* Save Button */}
        <Pressable onPress={handleSave} style={styles.saveButton}>
          <IconSymbol name="heart.fill" size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save Memory</Text>
        </Pressable>
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  imagePickerContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: colors.card,
    boxShadow: '0px 4px 12px rgba(233, 30, 99, 0.15)',
    elevation: 4,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.highlight,
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.highlight,
  },
  dateButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: colors.highlight,
  },
  dateText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    boxShadow: '0px 4px 12px rgba(233, 30, 99, 0.3)',
    elevation: 6,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
