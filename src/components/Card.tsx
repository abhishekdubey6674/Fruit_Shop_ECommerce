import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SHADOWS } from '../constants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  bordered?: boolean;
  padding?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  elevated = true,
  bordered = false,
  padding = 16,
}) => {
  return (
    <View
      style={[
        styles.card,
        { padding },
        elevated && SHADOWS.md,
        bordered && styles.bordered,
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
  },
  bordered: {
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
});

export default Card;
