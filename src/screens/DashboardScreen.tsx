import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FruitCard from '../components/FruitCard';
import { COLORS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';
import { useProducts, useCart, useAuth } from '../hooks';
import { convertProductsToFruits } from '../utils/productHelpers';
import { showToast } from '../utils/toast';

const DashboardScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch products from API only
  const { products, loading, error, refetch } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  // Convert API products to app format
  const apiFruits = useMemo(() => {
    return convertProductsToFruits(products);
  }, [products]);
  
  // Extract unique categories from API products
  const categories = useMemo(() => {
    const uniqueCategories = new Set(apiFruits.map(fruit => fruit.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, [apiFruits]);

  // Filter products by category and search
  const filteredFruits = useMemo(() => {
    let filtered = apiFruits;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(fruit => fruit.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(fruit =>
        fruit.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [apiFruits, selectedCategory, searchQuery]);

  const handleAddToCart = async (id: string) => {
    const fruit = apiFruits.find(f => f.id === id);
    const productId = parseInt(id);
    
    const result = await addToCart(productId, 1);
    
    if (result.success) {
      showToast.success(`${fruit?.name} added to cart!`, 'Added to Cart');
    } else {
      showToast.error(result.message || 'Failed to add to cart');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <Header userName={user?.full_name || 'User'} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </View>
    );
  }

  // Show error state
  if (error) {
    const isAuthError = error.includes('401') || error.includes('Unauthorized');
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <Header userName={user?.full_name || 'User'} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            {isAuthError ? '🔒 Please login to view products' : `⚠️ ${error}`}
          </Text>
          {!isAuthError && (
            <TouchableOpacity style={styles.retryButton} onPress={refetch}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Header userName={user?.full_name || 'User'} />
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <SearchBar 
          placeholder="Search products..." 
          onSearch={setSearchQuery}
        />
        
        {categories.length > 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={`${category}-${index}`}
                  style={[
                    styles.categoryCard,
                    selectedCategory === category && styles.activeCategoryCard,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                  activeOpacity={0.7}>
                  <Text
                    style={[
                      styles.categoryName,
                      selectedCategory === category && styles.activeCategoryName,
                    ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Products</Text>
            <Text style={styles.sectionSubtitle}>
              {filteredFruits.length} items
            </Text>
          </View>
          {filteredFruits.length > 0 ? (
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
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
              {searchQuery && (
                <Text style={styles.emptySubtext}>
                  Try adjusting your search
                </Text>
              )}
            </View>
          )}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.medium,
  },
  errorText: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    fontWeight: TYPOGRAPHY.medium,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    ...SHADOWS.md,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.bold,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textTertiary,
  },
});

export default DashboardScreen;
