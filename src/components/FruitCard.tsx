import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from './Icon';
import { COLORS, GRADIENTS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 56) / 2;

interface FruitCardProps {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  rating: number;
  onAddToCart: (id: string) => void;
}

const FruitCard: React.FC<FruitCardProps> = ({
  id,
  name,
  price,
  unit,
  image,
  rating,
  onAddToCart,
}) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.05)']}
            style={styles.imageOverlay}
          />
          <View style={styles.ratingBadge}>
            <Icon name="star" size={12} color={COLORS.secondary} />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
          <TouchableOpacity style={styles.favButton} activeOpacity={0.7}>
            <Icon name="heart-outline" size={18} color={COLORS.error} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.price}>₹{price}</Text>
              <Text style={styles.unit}>per {unit}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToCart(id)}
            activeOpacity={0.8}>
            <LinearGradient
              colors={GRADIENTS.primary}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xxl,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    backgroundColor: COLORS.backgroundDark,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  ratingBadge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: COLORS.glass,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
    ...SHADOWS.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  ratingText: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  favButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.glass,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  content: {
    padding: SPACING.md,
  },
  name: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    letterSpacing: -0.2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  price: {
    fontSize: TYPOGRAPHY.xxl,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  unit: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textTertiary,
    marginTop: SPACING.xs,
    fontWeight: TYPOGRAPHY.medium,
  },
  addButton: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  buttonGradient: {
    paddingVertical: SPACING.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.bold,
    letterSpacing: 0.3,
  },
});

export default FruitCard;
