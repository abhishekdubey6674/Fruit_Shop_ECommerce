import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, GRADIENTS } from '../constants/colors';
import { storage, StorageKeys } from '../utils/storage';

const AuthScreen = ({ navigation }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // Signup fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSendOTP = () => {
    if (phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    // Simulate OTP sending
    setOtpSent(true);
    Alert.alert('Success', 'OTP sent to your phone: 1234');
  };

  const handleVerifyOTP = async () => {
    if (otp === '1234') {
      // Mock successful login
      const userData = { phone, name: 'User', isLoggedIn: true };
      await storage.setItem(StorageKeys.USER_DATA, userData);
      navigation.replace('Main');
    } else {
      Alert.alert('Error', 'Invalid OTP. Use 1234');
    }
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !phone) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    // Mock successful signup
    const userData = { phone, name, email, isLoggedIn: true };
    await storage.setItem(StorageKeys.USER_DATA, userData);
    Alert.alert('Success', 'Account created successfully!');
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.logo}>🍎</Text>
          <Text style={styles.title}>Fruit Shop</Text>
          <Text style={styles.subtitle}>Fresh & Organic</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, isLogin && styles.activeTab]}
            onPress={() => {
              setIsLogin(true);
              setOtpSent(false);
            }}>
            <Text style={[styles.tabText, isLogin && styles.activeTabText]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, !isLogin && styles.activeTab]}
            onPress={() => setIsLogin(false)}>
            <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formCard}>
          {isLogin ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>📱 Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={10}
                />
              </View>

              {!otpSent ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSendOTP}
                  activeOpacity={0.8}>
                  <LinearGradient
                    colors={GRADIENTS.primary}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text style={styles.buttonText}>Get OTP</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>🔐 Enter OTP</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter 4-digit OTP"
                      keyboardType="number-pad"
                      value={otp}
                      onChangeText={setOtp}
                      maxLength={4}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleVerifyOTP}
                    activeOpacity={0.8}>
                    <LinearGradient
                      colors={GRADIENTS.primary}
                      style={styles.buttonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <Text style={styles.buttonText}>Verify OTP</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}
            </>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>👤 Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>📧 Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>🔒 Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>📱 Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={10}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleSignup}
                activeOpacity={0.8}>
                <LinearGradient
                  colors={GRADIENTS.primary}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={styles.buttonText}>Create Account</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logo: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  activeTabText: {
    color: COLORS.white,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AuthScreen;
