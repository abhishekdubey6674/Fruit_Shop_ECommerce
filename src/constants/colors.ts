export const COLORS = {
  // Primary palette - Premium green inspired by Stripe
  primary: '#00D9A3',
  primaryLight: '#33E3B5',
  primaryDark: '#00B386',
  primaryGlow: 'rgba(0, 217, 163, 0.12)',
  primarySoft: 'rgba(0, 217, 163, 0.08)',
  
  // Secondary palette - Vibrant accent
  secondary: '#FF6B35',
  secondaryLight: '#FF8A5B',
  secondaryDark: '#E85A2A',
  secondaryGlow: 'rgba(255, 107, 53, 0.12)',
  
  // Neutral palette - Clean and modern
  background: '#FAFBFC',
  backgroundDark: '#F5F7FA',
  backgroundElevated: '#FFFFFF',
  white: '#FFFFFF',
  black: '#0A0E27',
  
  // Text colors - High contrast hierarchy
  text: '#0A0E27',
  textPrimary: '#1A1F36',
  textSecondary: '#697386',
  textTertiary: '#9BA3B4',
  textLight: '#C1C7D0',
  textMuted: '#E3E8EF',
  
  // Status colors - Clear and accessible
  error: '#F04438',
  errorLight: '#FEE4E2',
  success: '#00D9A3',
  successLight: '#D1FAE5',
  warning: '#F79009',
  warningLight: '#FEF0C7',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  
  // UI elements - Subtle and refined
  cardBg: '#FFFFFF',
  cardBorder: '#EAECF0',
  border: '#E4E7EC',
  borderLight: '#F2F4F7',
  divider: '#EAECF0',
  
  // Shadows - Layered depth
  shadow: 'rgba(16, 24, 40, 0.05)',
  shadowMedium: 'rgba(16, 24, 40, 0.08)',
  shadowLarge: 'rgba(16, 24, 40, 0.12)',
  overlay: 'rgba(10, 14, 39, 0.6)',
  
  // Special effects
  shimmer: '#F2F4F7',
  highlight: '#FFF9E6',
  glass: 'rgba(255, 255, 255, 0.7)',
  
  // Interactive states
  hover: 'rgba(0, 217, 163, 0.04)',
  pressed: 'rgba(0, 217, 163, 0.08)',
  focus: 'rgba(0, 217, 163, 0.12)',
};

export const GRADIENTS = {
  primary: ['#00D9A3', '#00B386'],
  primaryReverse: ['#00B386', '#00D9A3'],
  primarySubtle: ['rgba(0, 217, 163, 0.1)', 'rgba(0, 217, 163, 0.05)'],
  secondary: ['#FF6B35', '#E85A2A'],
  sunset: ['#FF6B35', '#F04438'],
  ocean: ['#3B82F6', '#00D9A3'],
  purple: ['#8B5CF6', '#EC4899'],
  dark: ['rgba(10, 14, 39, 0.8)', 'rgba(10, 14, 39, 0.4)'],
  darkSolid: ['#1A1F36', '#0A0E27'],
  light: ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.7)'],
  glass: ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.6)'],
};

// Spacing system - Consistent 8px grid
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border radius system
export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

// Typography system
export const TYPOGRAPHY = {
  // Font sizes
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 48,
  
  // Font weights
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  
  // Line heights
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

// Shadow presets
export const SHADOWS = {
  sm: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.shadowMedium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: COLORS.shadowLarge,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: COLORS.shadowLarge,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 12,
  },
};
