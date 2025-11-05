
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#F8E8EE',
  text: '#333333',
  textSecondary: '#777777',
  primary: '#E91E63',
  secondary: '#9C27B0',
  accent: '#FF4081',
  card: '#FFFFFF',
  highlight: '#FFCDD2',
};

export const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    width: '100%',
  },
  accentButton: {
    backgroundColor: colors.accent,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 4px 12px rgba(233, 30, 99, 0.15)',
    elevation: 4,
  },
  icon: {
    width: 60,
    height: 60,
  },
});
