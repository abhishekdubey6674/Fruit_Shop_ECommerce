import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../components/Icon';
import { COLORS, GRADIENTS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';
import { storage } from '../utils/storage';

const ProfileScreen = ({ navigation }: any) => {
  const menuItems = [
    { id: '1', icon: 'bag-outline', title: 'My Orders', subtitle: 'View order history', screen: 'Orders' },
    { id: '2', icon: 'location-outline', title: 'Addresses', subtitle: 'Manage delivery addresses', screen: 'Addresses' },
    { id: '3', icon: 'card-outline', title: 'Payment Methods', subtitle: 'Saved cards & wallets', screen: 'Payment' },
    { id: '4', icon: 'notifications-outline', title: 'Notifications', subtitle: 'Manage preferences', screen: 'Notifications' },
    { id: '5', icon: 'information-circle-outline', title: 'Help & Support', subtitle: 'Get assistance', screen: 'Help' },
  ];

  const handleMenuPress = (item: any) => {
    Alert.alert(item.title, `${item.subtitle}\n\nThis feature will be available soon!`, [
      { text: 'OK', style: 'default' }
    ]);
  };

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
            await storage.clear();
            navigation.replace('Landing');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <LinearGradient
        colors={GRADIENTS.primary}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
          <Text style={styles.userName}>Abhishek Dubey</Text>
          <Text style={styles.userEmail}>Abhishek12@yahoo.com</Text>
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
              onPress={() => handleMenuPress(item)}
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

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerGradient: {
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.xxl,
  },
  profileHeader: {
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
  userName: {
    fontSize: TYPOGRAPHY.xxxl,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.white,
    marginBottom: SPACING.sm,
    letterSpacing: -0.5,
  },
  userEmail: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.white,
    opacity: 0.95,
    fontWeight: TYPOGRAPHY.medium,
  },
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
});

export default ProfileScreen;
