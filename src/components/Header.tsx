import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from './Icon';
import { COLORS, GRADIENTS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';

interface HeaderProps {
  userName?: string;
  showAvatar?: boolean;
  showNotification?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  userName = 'Guest', 
  showAvatar = true,
  showNotification = true 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      
      <View style={styles.rightContainer}>
        {showNotification && (
          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
            <Icon name="notifications-outline" size={24} color={COLORS.textPrimary} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        )}
        
        {showAvatar && (
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={GRADIENTS.primary}
              style={styles.avatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
            </LinearGradient>
            <View style={styles.avatarBadge}>
              <View style={styles.avatarBadgeDot} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.backgroundElevated,
    ...SHADOWS.sm,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.medium,
    marginBottom: SPACING.xs - 2,
    letterSpacing: 0.3,
  },
  userName: {
    fontSize: TYPOGRAPHY.xxxl - 4,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.error,
    borderWidth: 2,
    borderColor: COLORS.backgroundDark,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  avatarText: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.white,
  },
  avatarBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  avatarBadgeDot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.success,
  },
});

export default Header;
