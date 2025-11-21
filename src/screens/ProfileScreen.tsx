import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../components/Icon';
import { COLORS, GRADIENTS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';
import { useAuth, useAddresses } from '../hooks';
import { showToast } from '../utils/toast';
import { validateAddress } from '../utils/validation';

const ProfileScreen = ({ navigation }: any) => {
  const { user, logout, loading: authLoading } = useAuth();
  const { addresses, loading: addressLoading, addAddress, deleteAddress } = useAddresses();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    house_no: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    is_default: false,
  });
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.replace('Landing');
          },
        },
      ]
    );
  };

  const handleAddAddress = async () => {
    const validation = validateAddress(newAddress);

    if (!validation.isValid) {
      setAddressErrors(validation.errors);
      showToast.error('Please fill all required fields correctly');
      return;
    }

    const result = await addAddress(newAddress);
    if (result.success) {
      showToast.success('Address added successfully');
      setShowAddressModal(false);
      setNewAddress({
        house_no: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        is_default: false,
      });
      setAddressErrors({});
    } else {
      showToast.error(result.message || 'Failed to add address');
    }
  };

  const handleDeleteAddress = (id: number) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteAddress(id);
            if (result.success) {
              showToast.success('Address deleted successfully');
            } else {
              showToast.error(result.message || 'Failed to delete address');
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    { id: '1', icon: 'bag-outline', title: 'My Orders', subtitle: 'View order history', action: () => navigation.navigate('Orders') },
    { id: '2', icon: 'location-outline', title: 'Addresses', subtitle: `${addresses.length} saved addresses`, action: () => setShowAddressModal(true) },
    // { id: '3', icon: 'card-outline', title: 'Payment Methods', subtitle: 'Saved cards & wallets', action: () => Alert.alert('Coming Soon', 'Payment methods feature will be available soon') },
    // { id: '4', icon: 'notifications-outline', title: 'Notifications', subtitle: 'Manage preferences', action: () => Alert.alert('Coming Soon', 'Notifications feature will be available soon') },
    { id: '5', icon: 'information-circle-outline', title: 'Help & Support', subtitle: 'Get assistance', action: () => Alert.alert('Coming Soon', 'Help & Support feature will be available soon') },
  ];

  if (authLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <LinearGradient
        colors={GRADIENTS.primary}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profileHeader}>

          {/* Avatar Image */}
          <View style={styles.avatarContainer}>
            <Image
              source={require('../assets/images/image.png')}
              style={styles.avatarImage}
            />


          </View>

          {/* User Info */}
          <Text style={styles.userName}>
            {user?.full_name || "Guest User"}
          </Text>

          <Text style={styles.userEmail}>
            {user?.email || "guest@example.com"}
          </Text>

          <Text style={styles.userMobile}>
            📱 {user?.mobile || "+91 98765 43210"}
          </Text>

        </View>
      </LinearGradient>


      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}>
        <View style={styles.menuContainer}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.action}
              activeOpacity={0.7}>
              <View style={styles.menuIcon}>
                <Icon name={item.icon} size={24} color={COLORS.primary} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Icon name="chevron-forward" size={24} color={COLORS.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Addresses Section */}
        {addresses.length > 0 && (
          <View style={styles.addressesSection}>
            <Text style={styles.sectionTitle}>Saved Addresses</Text>
            {addresses.map((address) => (
              <View key={address.id} style={styles.addressCard}>
                <View style={styles.addressHeader}>
                  <Icon name="location" size={20} color={COLORS.primary} />
                  {address.is_default && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.addressText}>
                  {address.house_no}, {address.street}
                </Text>
                <Text style={styles.addressText}>
                  {address.city}, {address.state} - {address.pincode}
                </Text>
                <TouchableOpacity
                  style={styles.deleteAddressButton}
                  onPress={() => handleDeleteAddress(address.id)}
                  activeOpacity={0.7}>
                  <Icon name="trash-outline" size={18} color={COLORS.error} />
                  <Text style={styles.deleteAddressText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>

      {/* Add Address Modal */}
      <Modal
        visible={showAddressModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddressModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Address</Text>
              <TouchableOpacity onPress={() => {
                setShowAddressModal(false);
                setAddressErrors({});
              }}>
                <Icon name="close" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, addressErrors.house_no && styles.inputError]}
                  placeholder="House No / Flat No *"
                  value={newAddress.house_no}
                  onChangeText={(text) => {
                    setNewAddress({ ...newAddress, house_no: text });
                    if (addressErrors.house_no) {
                      setAddressErrors({ ...addressErrors, house_no: '' });
                    }
                  }}
                />
                {addressErrors.house_no && (
                  <Text style={styles.errorText}>{addressErrors.house_no}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, addressErrors.street && styles.inputError]}
                  placeholder="Street / Area *"
                  value={newAddress.street}
                  onChangeText={(text) => {
                    setNewAddress({ ...newAddress, street: text });
                    if (addressErrors.street) {
                      setAddressErrors({ ...addressErrors, street: '' });
                    }
                  }}
                />
                {addressErrors.street && (
                  <Text style={styles.errorText}>{addressErrors.street}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, addressErrors.city && styles.inputError]}
                  placeholder="City *"
                  value={newAddress.city}
                  onChangeText={(text) => {
                    setNewAddress({ ...newAddress, city: text });
                    if (addressErrors.city) {
                      setAddressErrors({ ...addressErrors, city: '' });
                    }
                  }}
                />
                {addressErrors.city && (
                  <Text style={styles.errorText}>{addressErrors.city}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, addressErrors.state && styles.inputError]}
                  placeholder="State *"
                  value={newAddress.state}
                  onChangeText={(text) => {
                    setNewAddress({ ...newAddress, state: text });
                    if (addressErrors.state) {
                      setAddressErrors({ ...addressErrors, state: '' });
                    }
                  }}
                />
                {addressErrors.state && (
                  <Text style={styles.errorText}>{addressErrors.state}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, addressErrors.pincode && styles.inputError]}
                  placeholder="Pincode *"
                  keyboardType="numeric"
                  maxLength={6}
                  value={newAddress.pincode}
                  onChangeText={(text) => {
                    setNewAddress({ ...newAddress, pincode: text });
                    if (addressErrors.pincode) {
                      setAddressErrors({ ...addressErrors, pincode: '' });
                    }
                  }}
                />
                {addressErrors.pincode && (
                  <Text style={styles.errorText}>{addressErrors.pincode}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setNewAddress({ ...newAddress, is_default: !newAddress.is_default })}
                activeOpacity={0.7}>
                <View style={[styles.checkbox, newAddress.is_default && styles.checkboxChecked]}>
                  {newAddress.is_default && <Icon name="checkmark" size={16} color={COLORS.white} />}
                </View>
                <Text style={styles.checkboxLabel}>Set as default address</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddAddress}
                activeOpacity={0.8}>
                <LinearGradient
                  colors={GRADIENTS.primary}
                  style={styles.addButtonGradient}>
                  <Text style={styles.addButtonText}>Add Address</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerGradient: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  profileHeader: {
    alignItems: "center",
  },

  avatarContainer: {
    height: 90,
    width: 90,
    borderRadius: 45,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    marginBottom: 12,
  },

  avatarImage: {
    height: "100%",
    width: "100%",
  },

  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginTop: 5,
  },

  userEmail: {
    fontSize: 14,
    color: "#f2f2f2",
    marginTop: 4,
  },

  userMobile: {
    fontSize: 15,
    color: "#fff",
    marginTop: 4,
    letterSpacing: 0.5,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    ...SHADOWS.xl,
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  avatarText: {
    fontSize: TYPOGRAPHY.display,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.primary,
  },
  // userName: {
  //   fontSize: TYPOGRAPHY.xxxl,
  //   fontWeight: TYPOGRAPHY.extrabold,
  //   color: COLORS.white,
  //   marginBottom: SPACING.sm,
  //   letterSpacing: -0.5,
  // },
  // userEmail: {
  //   fontSize: TYPOGRAPHY.base,
  //   color: COLORS.white,
  //   opacity: 0.95,
  //   fontWeight: TYPOGRAPHY.medium,
  // },
  // userMobile: {
  //   fontSize: TYPOGRAPHY.sm,
  //   color: COLORS.white,
  //   opacity: 0.9,
  //   marginTop: SPACING.xs,
  //   fontWeight: TYPOGRAPHY.medium,
  // },
  content: {
    flex: 1,
    marginTop: -SPACING.xl,
    borderTopLeftRadius: RADIUS.xxl + 4,
    borderTopRightRadius: RADIUS.xxl + 4,
    backgroundColor: COLORS.background,
    paddingTop: SPACING.md,
  },
  menuContainer: {
    padding: SPACING.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundElevated,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  menuIcon: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    letterSpacing: -0.2,
  },
  menuSubtitle: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.medium,
  },
  addressesSection: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  addressCard: {
    backgroundColor: COLORS.backgroundElevated,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  defaultBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: RADIUS.md,
    marginLeft: SPACING.sm,
  },
  defaultText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.bold,
  },
  addressText: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  deleteAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  deleteAddressText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
    marginLeft: SPACING.xs,
  },
  logoutButton: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    backgroundColor: COLORS.errorLight,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.error,
    ...SHADOWS.sm,
  },
  logoutText: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.error,
    letterSpacing: 0.3,
  },
  version: {
    textAlign: 'center',
    color: COLORS.textTertiary,
    fontSize: TYPOGRAPHY.sm,
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxl,
    fontWeight: TYPOGRAPHY.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xxl,
    borderTopRightRadius: RADIUS.xxl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  modalBody: {
    padding: SPACING.lg,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.xs,
    marginTop: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabel: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.medium,
  },
  addButton: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  addButtonGradient: {
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold,
  },
});

export default ProfileScreen;
