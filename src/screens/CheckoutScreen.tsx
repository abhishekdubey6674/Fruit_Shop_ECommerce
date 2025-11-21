// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   TextInput,
//   Modal,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from '../components/Icon';
// import { COLORS, GRADIENTS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';
// import { useCart, useAddresses, usePayment } from '../hooks';
// import { paymentAPI } from '../services/api';
// import { showToast } from '../utils/toast';
// import { validateAddress } from '../utils/validation';

// const CheckoutScreen = ({ navigation }: any) => {
//   const { cartItems, cartTotal, checkout, loading: cartLoading, refreshCart } = useCart();
//   const { addresses, addAddress, loading: addressLoading } = useAddresses();
//   const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
//     addresses.find(addr => addr.is_default)?.id || null
//   );
//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [processingCheckout, setProcessingCheckout] = useState(false);
//   const [newAddress, setNewAddress] = useState({
//     house_no: '',
//     street: '',
//     city: '',
//     state: '',
//     pincode: '',
//     is_default: false,
//   });
//   const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

//   const handleAddAddress = async () => {
//     const validation = validateAddress(newAddress);
    
//     if (!validation.isValid) {
//       setAddressErrors(validation.errors);
//       showToast.error('Please fill all required fields correctly');
//       return;
//     }

//     const result = await addAddress(newAddress);
//     if (result.success) {
//       showToast.success('Address added successfully');
//       setShowAddressModal(false);
//       setNewAddress({
//         house_no: '',
//         street: '',
//         city: '',
//         state: '',
//         pincode: '',
//         is_default: false,
//       });
//       setAddressErrors({});
//     } else {
//       showToast.error(result.message || 'Failed to add address');
//     }
//   };

//   const handleCheckout = async () => {
//   try {
//     if (!selectedAddressId) {
//       showToast.warning('Please select a delivery address');
//       return;
//     }

//     if (!cartItems || cartItems.length === 0) {
//       showToast.error('Your cart is empty');
//       return;
//     }

//     const invalidItems = cartItems.filter(item => !item.quantity || item.quantity <= 0);
//     if (invalidItems.length > 0) {
//       showToast.error('Some items have invalid quantities. Refreshing cart...');
//       await refreshCart();
//       return;
//     }

//     setProcessingCheckout(true);

//     // Step 1: Place order
//     const result = await checkout(selectedAddressId);

//     setProcessingCheckout(false);

//     // Handle cart cleared due to corruption
//     if (result?.cartCleared) {
//       showToast.error('Cart was corrupted and has been cleared. Please add items again.', 'Cart Cleared');
//       navigation.goBack();
//       return;
//     }

//     // Handle checkout failure
//     if (!result?.success) {
//       if (result?.message?.includes('Invalid cart data') || result?.message?.includes('quantity') || result?.message?.includes('corrupted')) {
//         showToast.error(result?.message || 'Cart issue detected. Please try again.', 'Error');
//         await refreshCart();
//       } else {
//         showToast.error(result?.message || 'Failed to place order');
//       }
//       return;
//     }

//     // Step 2: Process payment (if order was created successfully)
//     const orderId = Number(result?.order?.id);


//     if (!orderId) {
//         showToast.error("Order ID missing, cannot proceed.");
//       navigation.navigate('Orders');
//       return;
//     }

//     try {
//      const paymentRes = await paymentAPI.pay({
//   order: Number(orderId),  // ensure number
//   method: paymentMethod,
//   paid: paymentMethod === "card" ? true : false,
// });


//       showToast.success('Order placed successfully!');
//       navigation.navigate('Orders');
//     } catch (err: any) {
//       // Order was created but payment failed
//       showToast.warning('Order created but payment processing failed. Check your orders.');
//       navigation.navigate('Orders');
//     }

//   } catch (error) {
//     console.log(error);
//     setProcessingCheckout(false);
//     showToast.error("Something went wrong. Try again.");
//   }
// };


//   if (cartLoading || addressLoading) {
//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Icon name="arrow-back" size={24} color={COLORS.textPrimary} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Checkout</Text>
//           <View style={{ width: 40 }} />
//         </View>
//         <View style={styles.centerContainer}>
//           <ActivityIndicator size="large" color={COLORS.primary} />
//           <Text style={styles.loadingText}>Loading...</Text>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Icon name="arrow-back" size={24} color={COLORS.textPrimary} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Checkout</Text>
//         <View style={{ width: 40 }} />
//       </View>

//       <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 200 }}>
//         {/* Delivery Address Section */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Delivery Address</Text>
//             <TouchableOpacity
//               onPress={() => setShowAddressModal(true)}
//               style={styles.addButton}
//               activeOpacity={0.7}>
//               <Icon name="add" size={20} color={COLORS.primary} />
//               <Text style={styles.addButtonText}>Add New</Text>
//             </TouchableOpacity>
//           </View>

//           {addresses.length === 0 ? (
//             <View style={styles.emptyAddressContainer}>
//               <Icon name="location-outline" size={48} color={COLORS.textTertiary} />
//               <Text style={styles.emptyAddressText}>No addresses saved</Text>
//               <Text style={styles.emptyAddressSubtext}>Add a delivery address to continue</Text>
//             </View>
//           ) : (
//             addresses.map((address) => (
//               <TouchableOpacity
//                 key={address.id}
//                 style={[
//                   styles.addressCard,
//                   selectedAddressId === address.id && styles.selectedAddressCard,
//                 ]}
//                 onPress={() => setSelectedAddressId(address.id)}
//                 activeOpacity={0.7}>
//                 <View style={styles.radioButton}>
//                   {selectedAddressId === address.id && <View style={styles.radioButtonInner} />}
//                 </View>
//                 <View style={styles.addressContent}>
//                   <View style={styles.addressHeader}>
//                     <Icon name="location" size={18} color={COLORS.primary} />
//                     {address.is_default && (
//                       <View style={styles.defaultBadge}>
//                         <Text style={styles.defaultText}>Default</Text>
//                       </View>
//                     )}
//                   </View>
//                   <Text style={styles.addressText}>
//                     {address.house_no}, {address.street}
//                   </Text>
//                   <Text style={styles.addressText}>
//                     {address.city}, {address.state} - {address.pincode}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             ))
//           )}
//         </View>

//         {/* Order Summary Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Order Summary</Text>
//           {cartItems.map((item) => (
//             <View key={item.id} style={styles.orderItem}>
//               <Text style={styles.orderItemName}>{item.product.name}</Text>
//               <Text style={styles.orderItemQuantity}>x{item.quantity}</Text>
//               <Text style={styles.orderItemPrice}>
//                 ₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
//               </Text>
//             </View>
//           ))}
          
//           <View style={styles.divider} />
          
//           <View style={styles.totalRow}>
//             <Text style={styles.totalLabel}>Total Amount</Text>
//             <Text style={styles.totalAmount}>₹{cartTotal.toFixed(2)}</Text>
//           </View>
//         </View>
//  {/* Payemnt method */}
//   <Text style={styles.sectionTitle}>Choose Payment</Text>

// <View style={{ paddingHorizontal: 20 }}>

//   <TouchableOpacity
//     style={[styles.paymentOption, paymentMethod === 'cod' && styles.paymentSelected]}
//     onPress={() => setPaymentMethod('cod')}
//   >
//     <Icon name="cash-outline" size={22} color={COLORS.primary} />
//     <Text style={styles.paymentText}>Cash on Delivery</Text>
//   </TouchableOpacity>

//   <TouchableOpacity
//     style={[styles.paymentOption, paymentMethod === 'card' && styles.paymentSelected]}
//     onPress={() => setPaymentMethod('card')}
//   >
//     <Icon name="card-outline" size={22} color={COLORS.primary} />
//     <Text style={styles.paymentText}>Card Payment</Text>
//   </TouchableOpacity>

// </View>


//         <View>

//           </View>
//       </ScrollView>

//       {/* Footer */}
//       <View style={styles.footer}>
//         <View style={styles.footerContent}>
//           <View>
//             <Text style={styles.footerLabel}>Total</Text>
//             <Text style={styles.footerAmount}>₹{cartTotal.toFixed(2)}</Text>
//           </View>
//           <TouchableOpacity
//             style={[styles.checkoutButton, processingCheckout && styles.checkoutButtonDisabled]}
//             onPress={handleCheckout}
//             disabled={processingCheckout || addresses.length === 0}
//             activeOpacity={0.8}>
//             <LinearGradient
//               colors={processingCheckout || addresses.length === 0 ? [COLORS.textTertiary, COLORS.textTertiary] : GRADIENTS.primary}
//               style={styles.checkoutButtonGradient}>
//               {processingCheckout ? (
//                 <ActivityIndicator size="small" color={COLORS.white} />
//               ) : (
//                 <>
//                   <Text style={styles.checkoutButtonText}>Place Order</Text>
//                   <Icon name="arrow-forward" size={20} color={COLORS.white} />
//                 </>
//               )}
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Add Address Modal */}
//       <Modal
//         visible={showAddressModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowAddressModal(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Add Delivery Address</Text>
//               <TouchableOpacity onPress={() => {
//                 setShowAddressModal(false);
//                 setAddressErrors({});
//               }}>
//                 <Icon name="close" size={24} color={COLORS.textPrimary} />
//               </TouchableOpacity>
//             </View>

//             <ScrollView style={styles.modalBody}>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={[styles.input, addressErrors.house_no && styles.inputError]}
//                   placeholder="House No / Flat No *"
//                   value={newAddress.house_no}
//                   onChangeText={(text) => {
//                     setNewAddress({ ...newAddress, house_no: text });
//                     if (addressErrors.house_no) {
//                       setAddressErrors({ ...addressErrors, house_no: '' });
//                     }
//                   }}
//                 />
//                 {addressErrors.house_no && (
//                   <Text style={styles.errorText}>{addressErrors.house_no}</Text>
//                 )}
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={[styles.input, addressErrors.street && styles.inputError]}
//                   placeholder="Street / Area *"
//                   value={newAddress.street}
//                   onChangeText={(text) => {
//                     setNewAddress({ ...newAddress, street: text });
//                     if (addressErrors.street) {
//                       setAddressErrors({ ...addressErrors, street: '' });
//                     }
//                   }}
//                 />
//                 {addressErrors.street && (
//                   <Text style={styles.errorText}>{addressErrors.street}</Text>
//                 )}
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={[styles.input, addressErrors.city && styles.inputError]}
//                   placeholder="City *"
//                   value={newAddress.city}
//                   onChangeText={(text) => {
//                     setNewAddress({ ...newAddress, city: text });
//                     if (addressErrors.city) {
//                       setAddressErrors({ ...addressErrors, city: '' });
//                     }
//                   }}
//                 />
//                 {addressErrors.city && (
//                   <Text style={styles.errorText}>{addressErrors.city}</Text>
//                 )}
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={[styles.input, addressErrors.state && styles.inputError]}
//                   placeholder="State *"
//                   value={newAddress.state}
//                   onChangeText={(text) => {
//                     setNewAddress({ ...newAddress, state: text });
//                     if (addressErrors.state) {
//                       setAddressErrors({ ...addressErrors, state: '' });
//                     }
//                   }}
//                 />
//                 {addressErrors.state && (
//                   <Text style={styles.errorText}>{addressErrors.state}</Text>
//                 )}
//               </View>

//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={[styles.input, addressErrors.pincode && styles.inputError]}
//                   placeholder="Pincode *"
//                   keyboardType="numeric"
//                   maxLength={6}
//                   value={newAddress.pincode}
//                   onChangeText={(text) => {
//                     setNewAddress({ ...newAddress, pincode: text });
//                     if (addressErrors.pincode) {
//                       setAddressErrors({ ...addressErrors, pincode: '' });
//                     }
//                   }}
//                 />
//                 {addressErrors.pincode && (
//                   <Text style={styles.errorText}>{addressErrors.pincode}</Text>
//                 )}
//               </View>

//               <TouchableOpacity
//                 style={styles.checkboxContainer}
//                 onPress={() => setNewAddress({ ...newAddress, is_default: !newAddress.is_default })}
//                 activeOpacity={0.7}>
//                 <View style={[styles.checkbox, newAddress.is_default && styles.checkboxChecked]}>
//                   {newAddress.is_default && <Icon name="checkmark" size={16} color={COLORS.white} />}
//                 </View>
//                 <Text style={styles.checkboxLabel}>Set as default address</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.modalAddButton}
//                 onPress={handleAddAddress}
//                 activeOpacity={0.8}>
//                 <LinearGradient
//                   colors={GRADIENTS.primary}
//                   style={styles.modalAddButtonGradient}>
//                   <Text style={styles.modalAddButtonText}>Save Address</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: COLORS.backgroundElevated,
//     paddingHorizontal: SPACING.lg,
//     paddingVertical: SPACING.lg,
//     ...SHADOWS.sm,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: RADIUS.full,
//     backgroundColor: COLORS.primarySoft,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: TYPOGRAPHY.xxxl,
//     fontWeight: TYPOGRAPHY.extrabold,
//     color: COLORS.textPrimary,
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: SPACING.md,
//     fontSize: TYPOGRAPHY.base,
//     color: COLORS.textSecondary,
//   },
//   content: {
//     flex: 1,
//   },
//   section: {
//     padding: SPACING.lg,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SPACING.md,
//   },
//   sectionTitle: {
//     fontSize: TYPOGRAPHY.xl,
//     fontWeight: TYPOGRAPHY.bold,
//     color: COLORS.textPrimary,
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.primarySoft,
//     paddingHorizontal: SPACING.md,
//     paddingVertical: SPACING.sm,
//     borderRadius: RADIUS.lg,
//   },
//   addButtonText: {
//     color: COLORS.primary,
//     fontSize: TYPOGRAPHY.sm,
//     fontWeight: TYPOGRAPHY.semibold,
//     marginLeft: SPACING.xs,
//   },
//   emptyAddressContainer: {
//     alignItems: 'center',
//     padding: SPACING.xxl,
//     backgroundColor: COLORS.backgroundElevated,
//     borderRadius: RADIUS.xl,
//     borderWidth: 1,
//     borderColor: COLORS.cardBorder,
//   },
//   emptyAddressText: {
//     fontSize: TYPOGRAPHY.lg,
//     fontWeight: TYPOGRAPHY.semibold,
//     color: COLORS.textSecondary,
//     marginTop: SPACING.md,
//   },
//   emptyAddressSubtext: {
//     fontSize: TYPOGRAPHY.sm,
//     color: COLORS.textTertiary,
//     marginTop: SPACING.xs,
//   },
//   addressCard: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.backgroundElevated,
//     padding: SPACING.lg,
//     borderRadius: RADIUS.xl,
//     marginBottom: SPACING.md,
//     borderWidth: 2,
//     borderColor: COLORS.cardBorder,
//   },
//   selectedAddressCard: {
//     borderColor: COLORS.primary,
//     backgroundColor: COLORS.primarySoft,
//   },
//   radioButton: {
//     width: 24,
//     height: 24,
//     borderRadius: RADIUS.full,
//     borderWidth: 2,
//     borderColor: COLORS.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: SPACING.md,
//     marginTop: SPACING.xs,
//   },
//   radioButtonInner: {
//     width: 12,
//     height: 12,
//     borderRadius: RADIUS.full,
//     backgroundColor: COLORS.primary,
//   },
//   addressContent: {
//     flex: 1,
//   },
//   addressHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: SPACING.sm,
//   },
//   defaultBadge: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: SPACING.sm,
//     paddingVertical: 2,
//     borderRadius: RADIUS.md,
//     marginLeft: SPACING.sm,
//   },
//   defaultText: {
//     color: COLORS.white,
//     fontSize: TYPOGRAPHY.xs,
//     fontWeight: TYPOGRAPHY.bold,
//   },
//   addressText: {
//     fontSize: TYPOGRAPHY.sm,
//     color: COLORS.textSecondary,
//     marginBottom: SPACING.xs,
//   },
//   orderItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: SPACING.md,
//     backgroundColor: COLORS.backgroundElevated,
//     paddingHorizontal: SPACING.lg,
//     borderRadius: RADIUS.lg,
//     marginBottom: SPACING.sm,
//   },
//   orderItemName: {
//     flex: 1,
//     fontSize: TYPOGRAPHY.base,
//     color: COLORS.textPrimary,
//     fontWeight: TYPOGRAPHY.medium,
//   },
//   orderItemQuantity: {
//     fontSize: TYPOGRAPHY.sm,
//     color: COLORS.textSecondary,
//     marginHorizontal: SPACING.md,
//   },
//   orderItemPrice: {
//     fontSize: TYPOGRAPHY.base,
//     fontWeight: TYPOGRAPHY.bold,
//     color: COLORS.primary,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: COLORS.borderLight,
//     marginVertical: SPACING.md,
//   },
//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: SPACING.md,
//   },
//   totalLabel: {
//     fontSize: TYPOGRAPHY.lg,
//     fontWeight: TYPOGRAPHY.semibold,
//     color: COLORS.textPrimary,
//   },
//   totalAmount: {
//     fontSize: TYPOGRAPHY.xxxl,
//     fontWeight: TYPOGRAPHY.extrabold,
//     color: COLORS.primary,
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: COLORS.backgroundElevated,
//     ...SHADOWS.xl,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.cardBorder,
//   },
//   footerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: SPACING.lg,
//   },
//   footerLabel: {
//     fontSize: TYPOGRAPHY.sm,
//     color: COLORS.textSecondary,
//     fontWeight: TYPOGRAPHY.medium,
//   },
//   footerAmount: {
//     fontSize: TYPOGRAPHY.xxl,
//     fontWeight: TYPOGRAPHY.extrabold,
//     color: COLORS.primary,
//   },
//   checkoutButton: {
//     borderRadius: RADIUS.lg,
//     overflow: 'hidden',
//     ...SHADOWS.md,
//   },
//   checkoutButtonDisabled: {
//     opacity: 0.6,
//   },
//   checkoutButtonGradient: {
//     paddingVertical: SPACING.md,
//     paddingHorizontal: SPACING.xl,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: SPACING.sm,
//   },
//   checkoutButtonText: {
//     color: COLORS.white,
//     fontSize: TYPOGRAPHY.lg,
//     fontWeight: TYPOGRAPHY.bold,
//     marginRight: SPACING.sm,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: RADIUS.xxl,
//     borderTopRightRadius: RADIUS.xxl,
//     maxHeight: '85%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: SPACING.lg,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.borderLight,
//   },
//   modalTitle: {
//     fontSize: TYPOGRAPHY.xl,
//     fontWeight: TYPOGRAPHY.bold,
//     color: COLORS.textPrimary,
//   },
//   modalBody: {
//     padding: SPACING.lg,
//   },
//   inputContainer: {
//     marginBottom: SPACING.md,
//   },
//   input: {
//     backgroundColor: COLORS.background,
//     borderRadius: RADIUS.lg,
//     paddingHorizontal: SPACING.lg,
//     paddingVertical: SPACING.md,
//     fontSize: TYPOGRAPHY.base,
//     color: COLORS.textPrimary,
//     borderWidth: 1,
//     borderColor: COLORS.borderLight,
//   },
//   inputError: {
//     borderColor: COLORS.error,
//   },
//   errorText: {
//     color: COLORS.error,
//     fontSize: TYPOGRAPHY.xs,
//     marginTop: SPACING.xs,
//     marginLeft: SPACING.sm,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: SPACING.lg,
//   },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderRadius: RADIUS.sm,
//     borderWidth: 2,
//     borderColor: COLORS.borderLight,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: SPACING.sm,
//   },
//   checkboxChecked: {
//     backgroundColor: COLORS.primary,
//     borderColor: COLORS.primary,
//   },
//   checkboxLabel: {
//     fontSize: TYPOGRAPHY.base,
//     color: COLORS.textPrimary,
//     fontWeight: TYPOGRAPHY.medium,
//   },
//   modalAddButton: {
//     borderRadius: RADIUS.lg,
//     overflow: 'hidden',
//     ...SHADOWS.md,
//     marginTop: SPACING.md,
//   },
//   modalAddButtonGradient: {
//     paddingVertical: SPACING.lg,
//     alignItems: 'center',
//   },
//   modalAddButtonText: {
//     color: COLORS.white,
//     fontSize: TYPOGRAPHY.lg,
//     fontWeight: TYPOGRAPHY.bold,
//   },
//   paymentOption: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: COLORS.backgroundElevated,
//   padding: 15,
//   borderRadius: 12,
//   marginBottom: 10,
//   borderWidth: 2,
//   borderColor: COLORS.cardBorder,
// },
// paymentSelected: {
//   borderColor: COLORS.primary,
//   backgroundColor: COLORS.primarySoft,
// },
// paymentText: {
//   marginLeft: 12,
//   fontSize: TYPOGRAPHY.base,
//   fontWeight: TYPOGRAPHY.medium,
//   color: COLORS.textPrimary,
// },

// });

// export default CheckoutScreen;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  TextInput,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../components/Icon';
import { COLORS, GRADIENTS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';
import { useCart, useAddresses } from '../hooks';
import { paymentAPI } from '../services/api';
import { showToast } from '../utils/toast';
import { validateAddress } from '../utils/validation';

const CheckoutScreen = ({ navigation }: any) => {
  const { cartItems, cartTotal, checkout, loading: cartLoading, refreshCart } = useCart();
  const { addresses, addAddress, loading: addressLoading } = useAddresses();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

  // keep selected address in sync with addresses loaded
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    addresses.find((addr: any) => addr.is_default)?.id || null
  );
  useEffect(() => {
    // prefer default address, otherwise first address
    if (addresses && addresses.length > 0) {
      const defaultAddr = addresses.find((a: any) => a.is_default);
      setSelectedAddressId((prev) => prev ?? defaultAddr?.id ?? addresses[0].id);
    } else {
      setSelectedAddressId(null);
    }
  }, [addresses]);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [processingCheckout, setProcessingCheckout] = useState(false);
  const [newAddress, setNewAddress] = useState({
    house_no: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    is_default: false,
  });
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

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

  const handleCheckout = async () => {
    try {
      if (!selectedAddressId) {
        showToast.warning('Please select a delivery address');
        return;
      }

      if (!cartItems || cartItems.length === 0) {
        showToast.error('Your cart is empty');
        return;
      }

      const invalidItems = cartItems.filter((item) => !item.quantity || item.quantity <= 0);
      if (invalidItems.length > 0) {
        showToast.error('Some items have invalid quantities. Refreshing cart...');
        await refreshCart();
        return;
      }

      setProcessingCheckout(true);

      // Step 1: Place order
      const result = await checkout(selectedAddressId);

      // IMPORTANT: only treat cartCleared as a fatal error when checkout actually failed.
      if (!result?.success && result?.cartCleared) {
        // backend indicated corruption + checkout failed — clear handled by hook already, just notify
        showToast.error('Cart was corrupted and has been cleared. Please add items again.', 'Cart Cleared');
        await refreshCart();
        navigation.goBack();
        return;
      }

      // Handle checkout failure (non-corruption)
      if (!result?.success) {
        const msg = result?.message || 'Failed to place order';
        // If cart-related message, refresh cart to sync
        if (msg.includes('Invalid cart data') || msg.includes('quantity') || msg.includes('corrupted')) {
          showToast.error(msg, 'Error');
          await refreshCart();
        } else {
          showToast.error(msg);
        }
        return;
      }

      // At this point checkout succeeded
      // Step 2: Process payment (if order was created successfully)
      // Normalize order extraction robustly
      const orderObj = result?.order ?? null;
      const orderIdCandidate = Number(orderObj?.id ?? orderObj?.order_id ?? NaN);
      const orderId = Number.isFinite(orderIdCandidate) ? orderIdCandidate : NaN;

      if (!orderId || isNaN(orderId)) {
        showToast.error('Order created but missing order ID');
        navigation.navigate('Orders');
        return;
      }

      // Call payment API
      try {
        await paymentAPI.pay({
          order: Number(orderId),
          method: paymentMethod === 'card' ? 'card' : 'cod',
          paid: paymentMethod === 'card' ? true : false,
        });

        showToast.success('Order placed successfully!');
        // refresh cart to ensure UI is clean
        await refreshCart();
        navigation.navigate('Orders');
      } catch (err: any) {
        // Payment failed but order exists
        console.warn('Payment processing error:', err);
        showToast.warning('Order created but payment processing failed. Check your orders.');
        await refreshCart();
        navigation.navigate('Orders');
      }
    } catch (error) {
      console.error('Checkout unexpected error:', error);
      showToast.error('Something went wrong. Try again.');
    } finally {
      setProcessingCheckout(false);
    }
  };

  if (cartLoading || addressLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 200 }}>
        {/* Delivery Address Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity
              onPress={() => setShowAddressModal(true)}
              style={styles.addButton}
              activeOpacity={0.7}>
              <Icon name="add" size={20} color={COLORS.primary} />
              <Text style={styles.addButtonText}>Add New</Text>
            </TouchableOpacity>
          </View>

          {addresses.length === 0 ? (
            <View style={styles.emptyAddressContainer}>
              <Icon name="location-outline" size={48} color={COLORS.textTertiary} />
              <Text style={styles.emptyAddressText}>No addresses saved</Text>
              <Text style={styles.emptyAddressSubtext}>Add a delivery address to continue</Text>
            </View>
          ) : (
            addresses.map((address: any) => (
              <TouchableOpacity
                key={address.id}
                style={[
                  styles.addressCard,
                  selectedAddressId === address.id && styles.selectedAddressCard,
                ]}
                onPress={() => setSelectedAddressId(address.id)}
                activeOpacity={0.7}>
                <View style={styles.radioButton}>
                  {selectedAddressId === address.id && <View style={styles.radioButtonInner} />}
                </View>
                <View style={styles.addressContent}>
                  <View style={styles.addressHeader}>
                    <Icon name="location" size={18} color={COLORS.primary} />
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
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map((item: any) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.orderItemName}>{item.product.name}</Text>
              <Text style={styles.orderItemQuantity}>x{item.quantity}</Text>
              <Text style={styles.orderItemPrice}>
                ₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹{cartTotal.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment method */}
        <Text style={styles.sectionTitle}>Choose Payment</Text>

        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'cod' && styles.paymentSelected]}
            onPress={() => setPaymentMethod('cod')}>
            <Icon name="cash-outline" size={22} color={COLORS.primary} />
            <Text style={styles.paymentText}>Cash on Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'card' && styles.paymentSelected]}
            onPress={() => setPaymentMethod('card')}>
            <Icon name="card-outline" size={22} color={COLORS.primary} />
            <Text style={styles.paymentText}>Card Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View>
            <Text style={styles.footerLabel}>Total</Text>
            <Text style={styles.footerAmount}>₹{cartTotal.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={[styles.checkoutButton, processingCheckout && styles.checkoutButtonDisabled]}
            onPress={handleCheckout}
            disabled={processingCheckout || addresses.length === 0}
            activeOpacity={0.8}>
            <LinearGradient
              colors={processingCheckout || addresses.length === 0 ? [COLORS.textTertiary, COLORS.textTertiary] : GRADIENTS.primary}
              style={styles.checkoutButtonGradient}>
              {processingCheckout ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <>
                  <Text style={styles.checkoutButtonText}>Place Order</Text>
                  <Icon name="arrow-forward" size={20} color={COLORS.white} />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Address Modal */}
      <Modal
        visible={showAddressModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddressModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Delivery Address</Text>
              <TouchableOpacity
                onPress={() => {
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
                {addressErrors.house_no && <Text style={styles.errorText}>{addressErrors.house_no}</Text>}
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
                {addressErrors.street && <Text style={styles.errorText}>{addressErrors.street}</Text>}
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
                {addressErrors.city && <Text style={styles.errorText}>{addressErrors.city}</Text>}
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
                {addressErrors.state && <Text style={styles.errorText}>{addressErrors.state}</Text>}
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
                {addressErrors.pincode && <Text style={styles.errorText}>{addressErrors.pincode}</Text>}
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

              <TouchableOpacity style={styles.modalAddButton} onPress={handleAddAddress} activeOpacity={0.8}>
                <LinearGradient colors={GRADIENTS.primary} style={styles.modalAddButtonGradient}>
                  <Text style={styles.modalAddButtonText}>Save Address</Text>
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
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
  },
  addButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
    marginLeft: SPACING.xs,
  },
  emptyAddressContainer: {
    alignItems: 'center',
    padding: SPACING.xxl,
    backgroundColor: COLORS.backgroundElevated,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  emptyAddressText: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  emptyAddressSubtext: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textTertiary,
    marginTop: SPACING.xs,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundElevated,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  selectedAddressCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    marginTop: SPACING.xs,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
  },
  addressContent: {
    flex: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  defaultBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
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
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.backgroundElevated,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  orderItemName: {
    flex: 1,
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.medium,
  },
  orderItemQuantity: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    marginHorizontal: SPACING.md,
  },
  orderItemPrice: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  totalLabel: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textPrimary,
  },
  totalAmount: {
    fontSize: TYPOGRAPHY.xxxl,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.backgroundElevated,
    ...SHADOWS.xl,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  footerLabel: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.medium,
  },
  footerAmount: {
    fontSize: TYPOGRAPHY.xxl,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.primary,
  },
  checkoutButton: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  checkoutButtonDisabled: {
    opacity: 0.6,
  },
  checkoutButtonGradient: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold,
    marginRight: SPACING.sm,
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
    maxHeight: '85%',
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
  modalAddButton: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
    marginTop: SPACING.md,
  },
  modalAddButtonGradient: {
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  modalAddButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundElevated,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  paymentSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
  },
  paymentText: {
    marginLeft: 12,
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.textPrimary,
  },
});

export default CheckoutScreen;
