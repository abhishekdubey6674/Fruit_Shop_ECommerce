import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';
import Icon from '../components/Icon';
import { COLORS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';
import { useOrderDetail } from '../hooks';

const OrderDetailScreen = ({ route, navigation }: any) => {
  const { orderId } = route.params;
  const { order, loading, error } = useOrderDetail(orderId);

  const calculatedTotal = order?.items?.reduce((sum, item) => {
    return sum + (parseFloat(item.price) || 0);
  }, 0) || 0;

  const displayTotal = parseFloat(order?.total_amount || '0') > 0 
    ? parseFloat(order?.total_amount || '0')
    : calculatedTotal;

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading order details...</Text>
        </View>
      </View>
    );
  }

  if (error || !order) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.centerContainer}>
          <Icon name="alert-circle-outline" size={64} color={COLORS.error} />
          <Text style={styles.errorText}>{error || 'Order not found'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending': return COLORS.warning || '#FFA500';
      case 'confirmed': return COLORS.info || '#2196F3';
      case 'delivered': return COLORS.success;
      case 'cancelled': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'time-outline';
      case 'confirmed': return 'checkmark-circle-outline';
      case 'delivered': return 'checkmark-done-circle-outline';
      case 'cancelled': return 'close-circle-outline';
      default: return 'help-circle-outline';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Order Info Card */}
        <View style={styles.card}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderIdLabel}>Order ID</Text>
              <Text style={styles.orderIdValue}>#{order.id}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
              <Icon name={getStatusIcon(order.status)} size={16} color={getStatusColor(order.status)} />
              <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Icon name="calendar-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.infoLabel}>Order Date</Text>
            <Text style={styles.infoValue}>
              {new Date(order.created_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="location-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.infoLabel}>Delivery Address</Text>
          </View>
          <Text style={styles.addressText}>
            {typeof order.address === 'string' 
              ? order.address 
              : `${order.address.house_no}, ${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`
            }
          </Text>
        </View>

        {/* Order Items */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {order.items?.map((item: any) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemImageContainer}>
                {item.product.image ? (
                  <Image source={{ uri: item.product.image }} style={styles.itemImage} />
                ) : (
                  <View style={styles.itemImagePlaceholder}>
                    <Text style={styles.itemImagePlaceholderText}>🍽️</Text>
                  </View>
                )}
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemPrice}>₹{parseFloat(item.price).toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Price Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          
          {order.items?.map((item: any) => (
            <View key={item.id} style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                {item.product.name} (x{item.quantity})
              </Text>
              <Text style={styles.priceValue}>₹{parseFloat(item.price).toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{displayTotal.toFixed(2)}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.backgroundElevated,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    ...SHADOWS.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.xxxl,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.textPrimary,
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
  },
  errorText: {
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.lg,
    color: COLORS.error,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.bold,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.backgroundElevated,
    margin: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    ...SHADOWS.sm,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  orderIdLabel: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  orderIdValue: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
    gap: SPACING.xs,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  infoLabel: {
    flex: 1,
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textPrimary,
  },
  addressText: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xl + SPACING.sm,
    marginTop: SPACING.xs,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
  },
  itemImageContainer: {
    width: 60,
    height: 60,
    marginRight: SPACING.md,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.md,
  },
  itemImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primarySoft,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImagePlaceholderText: {
    fontSize: TYPOGRAPHY.xxl,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  itemQuantity: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  itemPrice: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.primary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  priceLabel: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textPrimary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
  },
  totalLabel: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: TYPOGRAPHY.xxl,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.primary,
  },
});

export default OrderDetailScreen;
