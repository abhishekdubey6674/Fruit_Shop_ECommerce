import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from '../components/Carousel';
import Icon from '../components/Icon';
import { CAROUSEL_DATA } from '../constants/dummy-data';
import { COLORS, GRADIENTS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';

const { height } = Dimensions.get('window');

const LandingScreen = ({ navigation }: any) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Subtle bounce animation for button
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -6,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fade in and slide up animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [bounceAnim, fadeAnim, slideAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Carousel */}
      <Carousel data={CAROUSEL_DATA} />
      
      {/* Premium gradient overlay */}
      <LinearGradient
        colors={[
          'transparent',
          'rgba(10, 14, 39, 0.2)',
          'rgba(10, 14, 39, 0.7)',
          'rgba(10, 14, 39, 0.95)',
        ]}
        locations={[0, 0.4, 0.7, 1]}
        style={styles.bottomGradient}
        pointerEvents="none"
      />
      
      {/* Content */}
      <Animated.View 
        style={[
          styles.bottomContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
        
        {/* Brand Badge */}
        <View style={styles.brandBadge}>
          <View style={styles.badgeIcon}>
            <Icon name="nutrition" size={16} color={COLORS.primary} />
          </View>
          <Text style={styles.brandText}>Fresh Market</Text>
        </View>
        
        {/* Headline */}
        <Text style={styles.headline}>
          Fresh & Organic{'\n'}Fruits Delivered
        </Text>
        
        {/* Subheadline */}
        <Text style={styles.subheadline}>
          Get farm-fresh fruits delivered to your doorstep.{'\n'}
          100% organic, handpicked with care.
        </Text>
        
        {/* Features */}
        <View style={styles.features}>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Icon name="checkmark-circle" size={16} color={COLORS.success} />
            </View>
            <Text style={styles.featureText}>Farm Fresh</Text>
          </View>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Icon name="checkmark-circle" size={16} color={COLORS.success} />
            </View>
            <Text style={styles.featureText}>Same Day Delivery</Text>
          </View>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Icon name="checkmark-circle" size={16} color={COLORS.success} />
            </View>
            <Text style={styles.featureText}>100% Organic</Text>
          </View>
        </View>
        
        {/* CTA Button */}
        <Animated.View 
          style={{ 
            transform: [
              { translateY: bounceAnim },
              { scale: scaleAnim }
            ] 
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Auth')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}>
            <LinearGradient
              colors={GRADIENTS.primary}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <Text style={styles.buttonText}>Get Started</Text>
              <Icon name="arrow-forward" size={20} color={COLORS.white} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Skip Link */}
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.55,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: height * 0.12,
    left: SPACING.lg,
    right: SPACING.lg,
    alignItems: 'center',
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeIcon: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },

  brandText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.bold,
    letterSpacing: 1,
  },
  headline: {
    fontSize: TYPOGRAPHY.display - 8,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.md,
    letterSpacing: -1,
    lineHeight: TYPOGRAPHY.display,
  },
  subheadline: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.medium,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: TYPOGRAPHY.base * 1.6,
    paddingHorizontal: SPACING.md,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    gap: SPACING.lg,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 217, 163, 0.15)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(0, 217, 163, 0.3)',
  },
  featureIcon: {
    marginRight: SPACING.xs,
  },
  featureText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.semibold,
    letterSpacing: 0.5,
  },
  button: {
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    width: '100%',
    ...SHADOWS.xl,
    shadowColor: COLORS.primary,
  },
  buttonGradient: {
    paddingVertical: SPACING.lg + 2,
    paddingHorizontal: SPACING.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold,
    letterSpacing: 0.5,
  },
  skipButton: {
    marginTop: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.medium,
    letterSpacing: 0.5,
  },
});

export default LandingScreen;
