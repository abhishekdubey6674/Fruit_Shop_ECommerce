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
import { COLORS, GRADIENTS, TYPOGRAPHY, RADIUS, SPACING } from '../constants/colors';

const { height } = Dimensions.get('window');

const LandingScreen = ({ navigation }: any) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Top Carousel */}
      <Carousel data={CAROUSEL_DATA} />

      {/* Bottom Gradient */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
        style={styles.bottomGradient}
      />

      {/* Content */}
      <Animated.View
        style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        {/* Badge */}
        <View style={styles.tag}>
          <Icon name="nutrition" size={12} color={COLORS.primary} />
          <Text style={styles.tagText}>Fresh • Organic • Pure</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Freshness Delivered</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Get handpicked fruits & vegetables brought straight to you — same day.
        </Text>

        {/* Features (tight chips) */}
        <View style={styles.uspRow}>
          <View style={styles.uspChip}><Text style={styles.uspText}>Farm Fresh</Text></View>
          <View style={styles.uspChip}><Text style={styles.uspText}>Same Day</Text></View>
          <View style={styles.uspChip}><Text style={styles.uspText}>Organic</Text></View>
        </View>

        {/* Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Auth')} activeOpacity={0.8}>
          <LinearGradient colors={GRADIENTS.primary} style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
            <Icon name="arrow-forward" size={22} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Skip */}
        <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.skip}>Skip for now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default LandingScreen;

// ------------------------------------------------------
// Styles
// ------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },

  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.42,
  },

  content: {
    position: 'absolute',
    bottom: height * 0.10,
    width: '100%',
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },

  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
    marginTop : SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  tagText: {
    color: COLORS.white,
    marginLeft: 6,
    fontSize: TYPOGRAPHY.xs,
    opacity: 0.9,
  },

  title: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.display - 14,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: SPACING.xs,
    letterSpacing: -0.5,
  },

  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: TYPOGRAPHY.sm,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 18,
    maxWidth: '90%',
  },

  uspRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },

  uspChip: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  uspText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.xs,
  },

  button: {
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SPACING.sm,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.base,
    fontWeight: '700',
  },

  skip: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: TYPOGRAPHY.xs,
    marginTop: SPACING.xs,
  },
});
