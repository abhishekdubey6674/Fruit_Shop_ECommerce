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
import { COLORS, GRADIENTS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';
import { storage, StorageKeys } from '../utils/storage';
import { showToast } from '../utils/toast';
import { validateEmail, validateMobile, validatePassword, validateFullName } from '../utils/validation';

// Declare global type for BASE_URL
declare const global: {
  BASE_URL: string;
};

const AuthScreen = ({ navigation }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Login fields
  const [loginEmailOrMobile, setLoginEmailOrMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

 const handleLogin = async () => {
  if (!loginEmailOrMobile.trim()) {
    showToast.error('Please enter email ');
    return;
  }

  if (!loginPassword.trim()) {
    showToast.error('Please enter password');
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(`${global.BASE_URL}/users/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email_or_mobile: loginEmailOrMobile.trim(),
        password: loginPassword,
      }),
    });

    const data = await response.json();

   if (response.ok) {

  if (!data.tokens?.access) {
    showToast.error("Token missing in response");
    return;
  }

  // Save access + refresh token separately
  await storage.setItem(StorageKeys.ACCESS_TOKEN, data.tokens.access);
  await storage.setItem(StorageKeys.REFRESH_TOKEN, data.tokens.refresh);

  // Save whole user object (optional)
  const userData = {
    accessToken: data.tokens.access,
    refreshToken: data.tokens.refresh,
    isLoggedIn: true,
  };

  await storage.setItem(StorageKeys.USER_DATA, userData);

  console.log("TOKEN SAVED =", await storage.getItem(StorageKeys.ACCESS_TOKEN));

  showToast.success("Login successful!", "Welcome");
  navigation.replace("Welcome");
}
 else {
      showToast.error(data.msg || 'Invalid credentials', 'Login Failed');
    }

  } catch (error) {
    showToast.error('Network error. Please try again.');
    console.error('Login error:', error);
  } finally {
    setLoading(false);
  }
};


 const handleSignup = async () => {
  const nameValidation = validateFullName(name);
  if (!nameValidation.isValid) {
    showToast.error(nameValidation.error || 'Invalid name');
    return;
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    showToast.error(emailValidation.error || 'Invalid email');
    return;
  }

  const mobileValidation = validateMobile(mobile);
  if (!mobileValidation.isValid) {
    showToast.error(mobileValidation.error || 'Invalid mobile number');
    return;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    showToast.error(passwordValidation.error || 'Invalid password');
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(`${global.BASE_URL}/users/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        mobile: mobile.trim(),
        full_name: name.trim(),
        password: password,
      }),
    });

    const data = await response.json();
    console.log("SIGNUP RESPONSE:", data);

    if (response.ok) {
      showToast.success('Account created! Please login.', 'Success');
      setIsLogin(true);

      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
    } else {
      showToast.error(
        data.msg || data.error || "Unable to create account",
        "Signup Failed"
      );
    }
  } catch (error) {
    showToast.error('Network error. Please try again.');
    console.error('Signup error:', error);
  } finally {
    setLoading(false);
  }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={GRADIENTS.primary}
              style={styles.logoGradient}>
              <Text style={styles.logo}>🔐</Text>
            </LinearGradient>
          </View>
          <Text style={styles.title}>Food Shop</Text>
          <Text style={styles.subtitle}>Fresh & Organic Delivered</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, isLogin && styles.activeTab]}
            onPress={() => setIsLogin(true)}>
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
                <Text style={styles.label}>📧 Email </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email"
                  value={loginEmailOrMobile}
                  onChangeText={setLoginEmailOrMobile}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>🔒 Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry
                  value={loginPassword}
                  onChangeText={setLoginPassword}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}>
                <LinearGradient
                  colors={GRADIENTS.primary}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={styles.buttonText}>
                    {loading ? 'Logging in...' : 'Login'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
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
                <Text style={styles.label}>📱 Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your mobile number"
                  keyboardType="phone-pad"
                  value={mobile}
                  onChangeText={setMobile}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleSignup}
                disabled={loading}
                activeOpacity={0.8}>
                <LinearGradient
                  colors={GRADIENTS.primary}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={styles.buttonText}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Text>
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
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: SPACING.xxl,
    marginBottom: SPACING.xl,
  },
  logoContainer: {
    marginBottom: SPACING.lg,
    ...SHADOWS.lg,
  },
  logoGradient: {
    width: 110,
    height: 110,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
  },
  title: {
    fontSize: TYPOGRAPHY.display,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.medium,
    letterSpacing: 0.3,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundElevated,
    borderRadius: RADIUS.xl,
    padding: SPACING.xs,
    marginBottom: SPACING.xl,
    ...SHADOWS.sm,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderRadius: RADIUS.lg,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.md,
  },
  tabText: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.bold,
  },
  formCard: {
    backgroundColor: COLORS.backgroundElevated,
    borderRadius: RADIUS.xxl,
    padding: SPACING.xl,
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md + 2,
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textPrimary,
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    fontWeight: TYPOGRAPHY.medium,
  },
  button: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginTop: SPACING.md,
    ...SHADOWS.md,
  },
  buttonGradient: {
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold,
    letterSpacing: 0.5,
  },
});

export default AuthScreen;
