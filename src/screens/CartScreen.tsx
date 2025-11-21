import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../components/Icon';
import { COLORS, GRADIENTS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';
import { useCart } from '../hooks';
import { showToast } from '../utils/toast';

const CartScreen = ({ navigation }: any) => {
  const { cartItems, loading, cartTotal, updateQuantity, removeFromCart, refreshCart, clearCart } = useCart();

  useFocusEffect(
    React.useCallback(() => {
      refreshCart();
    }, [refreshCart])
  );

  const handleIncrement = async (cartItemId: number) => {
    const result = await updateQuantity(cartItemId, 'increment');
    if (!result.success) showToast.error(result.message || 'Failed to update quantity');
  };

  const handleDecrement = async (cartItemId: number, currentQuantity: number) => {
    if (currentQuantity <= 1) {
      handleRemoveItem(cartItemId);
      return;
    }
    const result = await updateQuantity(cartItemId, 'decrement');
    if (!result.success) showToast.error(result.message || 'Failed to update quantity');
  };

  const handleRemoveItem = (cartItemId: number) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          const result = await removeFromCart(cartItemId);
          result.success ? showToast.success('Item removed from cart') : showToast.error(result.message || 'Failed to remove item');
        },
      },
    ]);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast.warning('Please add items to cart first', 'Empty Cart');
      return;
    }
    navigation.navigate('Checkout');
  };

  const handleClearCart = () => {
    Alert.alert('Clear Cart', 'Are you sure you want to remove all items from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear All',
        style: 'destructive',
        onPress: async () => {
          const result = await clearCart();
          result.success ? showToast.success('Cart cleared successfully') : showToast.error(result.message || 'Failed to clear cart');
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading cart...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 100 }]}>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>Add some fresh products to get started!</Text>
            <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
              <LinearGradient colors={GRADIENTS.primary} style={styles.shopButtonGradient}>
                <Text style={styles.shopButtonText}>Start Shopping</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>My Cart</Text>
          <Text style={styles.headerSubtitle}>{cartItems.length} items</Text>
        </View>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
            <Icon name="trash-outline" size={20} color={COLORS.error} />
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 240 }}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.productImage}>
              {item.product.image ? <Image source={{ uri: item.product.image }} style={styles.image} /> : <Text style={styles.imagePlaceholder}>🍽️</Text>}
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>{item.product.name}</Text>
              <Text style={styles.productDescription} numberOfLines={2}>{item.product.description}</Text>
              <Text style={styles.productPrice}>₹{item.product.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(item.id, item.quantity)} activeOpacity={0.7}>
                <Icon name="remove" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrement(item.id)} activeOpacity={0.7}>
                <Icon name="add" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.id)} activeOpacity={0.7}>
              <Icon name="trash-outline" size={12} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{cartTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout} activeOpacity={0.8}>
          <LinearGradient colors={GRADIENTS.primary} style={styles.checkoutButtonGradient}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            <Icon name="arrow-forward" size={20} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundElevated,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    ...SHADOWS.sm,
  },
  headerLeft: { flex: 1 },
  headerTitle: { fontSize: TYPOGRAPHY.xxxl, fontWeight: TYPOGRAPHY.extrabold, color: COLORS.textPrimary, letterSpacing: -0.5 },
  headerSubtitle: { fontSize: TYPOGRAPHY.sm, color: COLORS.textSecondary, marginTop: SPACING.xs, fontWeight: TYPOGRAPHY.medium },
  clearButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFE5E5', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.lg, gap: SPACING.xs },
  clearButtonText: { color: COLORS.error, fontSize: TYPOGRAPHY.sm, fontWeight: TYPOGRAPHY.semibold },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: SPACING.md, fontSize: TYPOGRAPHY.base, color: COLORS.textSecondary, fontWeight: TYPOGRAPHY.medium },
  content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl },
  emptyContainer: { alignItems: 'center', backgroundColor: COLORS.backgroundElevated, padding: SPACING.xxl, borderRadius: RADIUS.xxl, ...SHADOWS.md, borderWidth: 1, borderColor: COLORS.cardBorder },
  emptyIcon: { fontSize: 120, marginBottom: SPACING.xl },
  emptyTitle: { fontSize: TYPOGRAPHY.xxxl, fontWeight: TYPOGRAPHY.extrabold, color: COLORS.textPrimary, marginBottom: SPACING.md, letterSpacing: -0.5 },
  emptySubtitle: { fontSize: TYPOGRAPHY.base, color: COLORS.textSecondary, textAlign: 'center', lineHeight: TYPOGRAPHY.relaxed * TYPOGRAPHY.base, fontWeight: TYPOGRAPHY.medium, marginBottom: SPACING.xl },
  shopButton: { borderRadius: RADIUS.lg, overflow: 'hidden', ...SHADOWS.md },
  shopButtonGradient: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl, alignItems: 'center' },
  shopButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.base, fontWeight: TYPOGRAPHY.bold },
  scrollView: { flex: 1 },
  cartItem: { flexDirection: 'row', backgroundColor: COLORS.backgroundElevated, marginHorizontal: SPACING.lg, marginTop: SPACING.md, padding: SPACING.md, borderRadius: RADIUS.xl, ...SHADOWS.sm, borderWidth: 1, borderColor: COLORS.cardBorder, alignItems: 'center' },
  productImage: { width: 60, height: 60, borderRadius: RADIUS.lg, backgroundColor: COLORS.primarySoft, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  image: { width: '100%', height: '100%', borderRadius: RADIUS.lg, resizeMode: 'cover' },
  imagePlaceholder: { fontSize: 40 },
  productInfo: { flex: 2, marginRight: SPACING.sm, minWidth: 0 },
  productName: { fontSize: TYPOGRAPHY.base, fontWeight: TYPOGRAPHY.bold, color: COLORS.textPrimary, marginBottom: SPACING.xs, flexShrink: 1, flexWrap: 'wrap' },
  productDescription: { fontSize: TYPOGRAPHY.xs, color: COLORS.textSecondary, marginBottom: SPACING.xs, flexShrink: 1, flexWrap: 'wrap' },
  productPrice: { fontSize: TYPOGRAPHY.lg, fontWeight: TYPOGRAPHY.bold, color: COLORS.primary },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primarySoft, borderRadius: RADIUS.md, padding: SPACING.xs, marginRight: SPACING.sm },
  quantityButton: { width: 22, height: 22, borderRadius: RADIUS.md, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' },
  quantityText: { fontSize: TYPOGRAPHY.base, fontWeight: TYPOGRAPHY.bold, color: COLORS.textPrimary, marginHorizontal: SPACING.md, minWidth: 24, textAlign: 'center' },
  removeButton: { width: 25, height: 25, borderRadius: RADIUS.full, backgroundColor: COLORS.errorLight, justifyContent: 'center', alignItems: 'center' },
  footer: { backgroundColor: COLORS.backgroundElevated, paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.lg + 20, ...SHADOWS.xl, borderTopWidth: 1, borderTopColor: COLORS.cardBorder },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  totalLabel: { fontSize: TYPOGRAPHY.lg, fontWeight: TYPOGRAPHY.semibold, color: COLORS.textSecondary },
  totalAmount: { fontSize: TYPOGRAPHY.xxxl, fontWeight: TYPOGRAPHY.extrabold, color: COLORS.primary },
  checkoutButton: { borderRadius: RADIUS.lg, overflow: 'hidden', ...SHADOWS.md },
  checkoutButtonGradient: { paddingVertical: SPACING.lg, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: SPACING.sm },
  checkoutButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.sm, fontWeight: TYPOGRAPHY.bold, marginRight: SPACING.sm , marginBottom: SPACING.xl},
});

export default CartScreen;
