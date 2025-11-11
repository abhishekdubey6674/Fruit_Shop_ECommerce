import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../components/Icon';
import { COLORS, GRADIENTS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';

interface WelcomeScreenProps {
  navigation: any;
  route: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation, route }) => {
  const userName = route.params?.userName || 'Guest';
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto navigate after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}>
        
        {/* Success Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}>
          <View style={styles.iconCircle}>
            <Icon name="checkmark-circle" size={64} color={COLORS.success} />
          </View>
        </Animated.View>

        {/* Welcome Message */}
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.userName}>{userName}</Text>

        {/* Quotes */}
        <View style={styles.quotesContainer}>
          <View style={styles.quoteCard}>
            <View style={styles.quoteIcon}>
              <Icon name="nutrition" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.quoteText}>
              "Eating healthy is a form of self-respect"
            </Text>
          </View>

          <View style={styles.quoteCard}>
            <View style={styles.quoteIcon}>
              <Icon name="heart-outline" size={20} color={COLORS.error} />
            </View>
            <Text style={styles.quoteText}>
              "Your body is a temple, nourish it well"
            </Text>
          </View>
        </View>

        {/* Skip Button */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace('Main')}
          activeOpacity={0.7}>
          <Text style={styles.skipText}>Continue</Text>
          <Icon name="arrow-forward" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    marginBottom: SPACING.xl,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  welcomeText: {
    fontSize: TYPOGRAPHY.display - 8,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    letterSpacing: -1,
  },
  userName: {
    fontSize: TYPOGRAPHY.xxxl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xxl,
  },
  quotesContainer: {
    width: '100%',
    gap: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  quoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundElevated,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.md,
  },
  quoteIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  quoteText: {
    flex: 1,
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.base * 1.6,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.full,
    gap: SPACING.sm,
    ...SHADOWS.md,
  },
  skipText: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
});

export default WelcomeScreen;
