import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FruitCard from '../components/FruitCard';
import Icon from '../components/Icon';
import { CATEGORIES, FRUITS } from '../constants/dummy-data';
import { COLORS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';

const DashboardScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  const filteredFruits =
    selectedCategory === 'All'
      ? FRUITS
      : FRUITS.filter(fruit => fruit.category === selectedCategory);

  const handleAddToCart = (id: string) => {
    const fruit = FRUITS.find(f => f.id === id);
    setCartCount(prev => prev + 1);
    Alert.alert('Added to Cart', `${fruit?.name} added successfully!`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Header userName="Abhishek" />
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <SearchBar placeholder="Search fresh fruits..." />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}>
            {CATEGORIES.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.name && styles.activeCategoryCard,
                ]}
                onPress={() => setSelectedCategory(category.name)}
                activeOpacity={0.7}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text
                  style={[
                    styles.categoryName,
                    selectedCategory === category.name && styles.activeCategoryName,
                  ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Fresh Fruits</Text>
            <Text style={styles.sectionSubtitle}>
              {filteredFruits.length} items
            </Text>
          </View>
          <View style={styles.productsGrid}>
            {filteredFruits.map(fruit => (
              <FruitCard
                key={fruit.id}
                id={fruit.id}
                name={fruit.name}
                price={fruit.price}
                unit={fruit.unit}
                image={fruit.image}
                rating={fruit.rating}
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.xxl,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.semibold,
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
  },
  categoriesContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  categoryCard: {
    backgroundColor: COLORS.backgroundElevated,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    marginRight: SPACING.md,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    ...SHADOWS.sm,
  },
  activeCategoryCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    ...SHADOWS.md,
    transform: [{ scale: 1.02 }],
  },
  categoryIcon: {
    fontSize: TYPOGRAPHY.xl,
    marginRight: SPACING.sm,
  },
  categoryName: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  activeCategoryName: {
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.bold,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
});

export default DashboardScreen;
