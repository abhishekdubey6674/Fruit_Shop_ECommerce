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
import FruitCard from '../components/FruitCard';
import { CATEGORIES, FRUITS } from '../constants/dummy-data';
import { COLORS } from '../constants/colors';

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
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  categoryCard: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeCategoryCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  activeCategoryName: {
    color: COLORS.white,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default DashboardScreen;
