import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

const LoadingShimmer: React.FC = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={styles.container}>
      <View style={styles.shimmerCard}>
        <View style={styles.shimmerImage} />
        <View style={styles.shimmerContent}>
          <View style={styles.shimmerLine} />
          <View style={styles.shimmerLineShort} />
        </View>
        <Animated.View
          style={[
            styles.shimmerOverlay,
            { transform: [{ translateX }] },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  shimmerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  shimmerImage: {
    height: 150,
    backgroundColor: COLORS.shimmer,
  },
  shimmerContent: {
    padding: 14,
  },
  shimmerLine: {
    height: 16,
    backgroundColor: COLORS.shimmer,
    borderRadius: 8,
    marginBottom: 10,
  },
  shimmerLineShort: {
    height: 16,
    width: '60%',
    backgroundColor: COLORS.shimmer,
    borderRadius: 8,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default LoadingShimmer;
