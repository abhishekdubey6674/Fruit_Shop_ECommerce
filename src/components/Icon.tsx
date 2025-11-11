import React from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import { COLORS, RADIUS } from '../constants/colors';

// Simple icon component using Unicode symbols
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = COLORS.textPrimary,
  backgroundColor,
  style,
}) => {
  // Using Unicode symbols for better rendering
  const iconMap: { [key: string]: string } = {
    // Navigation
    home: '⌂',
    'home-outline': '⌂',
    cart: '⛁',
    'cart-outline': '⛁',
    user: '◉',
    'person-outline': '◉',
    search: '⌕',
    'search-outline': '⌕',
    menu: '☰',
    back: '←',
    'arrow-back': '←',
    forward: '→',
    'arrow-forward': '→',
    close: '✕',
    'close-outline': '✕',
    
    // Food & Nutrition
    nutrition: '◐',
    'nutrition-outline': '◐',
    restaurant: '⚑',
    'restaurant-outline': '⚑',
    
    // Actions
    add: '+',
    'add-circle-outline': '⊕',
    remove: '−',
    edit: '✎',
    'create-outline': '✎',
    trash: '🗑',
    'trash-outline': '🗑',
    checkmark: '✓',
    'checkmark-circle': '✓',
    heart: '♡',
    'heart-outline': '♡',
    'heart-filled': '♥',
    star: '★',
    'star-outline': '☆',
    share: '⤴',
    'share-social-outline': '⤴',
    
    // Status
    information: 'ℹ',
    'information-circle-outline': 'ℹ',
    warning: '⚠',
    'warning-outline': '⚠',
    alert: '⚠',
    'alert-circle-outline': '⚠',
    
    // E-commerce
    bag: '⛁',
    'bag-outline': '⛁',
    pricetag: '⚐',
    'pricetag-outline': '⚐',
    gift: '⚐',
    'gift-outline': '⚐',
    car: '⚐',
    'car-outline': '⚐',
    location: '⚐',
    'location-outline': '⚐',
    card: '▭',
    'card-outline': '▭',
    
    // Communication
    call: '📞',
    'call-outline': '📞',
    mail: '✉',
    'mail-outline': '✉',
    chatbubble: '💬',
    'chatbubble-outline': '💬',
    notifications: '🔔',
    'notifications-outline': '🔔',
    
    // Settings
    settings: '⚙',
    'settings-outline': '⚙',
    lock: '🔒',
    'lock-closed-outline': '🔒',
    unlock: '🔓',
    'lock-open-outline': '🔓',
    eye: '👁',
    'eye-outline': '👁',
    'eye-off-outline': '🙈',
    
    // Misc
    calendar: '📅',
    'calendar-outline': '📅',
    time: '🕐',
    'time-outline': '🕐',
    image: '🖼',
    'image-outline': '🖼',
    document: '📄',
    'document-outline': '📄',
    download: '⬇',
    'download-outline': '⬇',
    upload: '⬆',
    'cloud-upload-outline': '⬆',
    
    // Additional
    filter: '⚑',
    'filter-outline': '⚑',
    'ellipsis-horizontal': '⋯',
    'ellipsis-vertical': '⋮',
    'chevron-forward': '›',
    'chevron-back': '‹',
    'chevron-down': '⌄',
    'chevron-up': '⌃',
  };

  const iconContent = iconMap[name] || '●';

  if (backgroundColor) {
    return (
      <View
        style={[
          styles.container,
          {
            width: size * 1.8,
            height: size * 1.8,
            borderRadius: (size * 1.8) / 2,
            backgroundColor,
          },
          style,
        ]}>
        <Text style={[styles.iconText, { fontSize: size, color }]}>
          {iconContent}
        </Text>
      </View>
    );
  }

  return (
    <Text style={[styles.iconText, { fontSize: size, color }, style]}>
      {iconContent}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    textAlign: 'center',
    lineHeight: undefined,
  },
});

export default Icon;
