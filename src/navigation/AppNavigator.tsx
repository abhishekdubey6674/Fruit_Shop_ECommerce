import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/LandingScreen';
import AuthScreen from '../screens/AuthScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textTertiary,
        tabBarStyle: {
          backgroundColor: COLORS.backgroundElevated,
          borderTopWidth: 0,
          paddingBottom: SPACING.md,
          paddingTop: SPACING.md,
          height: 75,
          ...SHADOWS.xl,
          borderTopLeftRadius: RADIUS.xxl + 4,
          borderTopRightRadius: RADIUS.xxl + 4,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: TYPOGRAPHY.xs,
          fontWeight: TYPOGRAPHY.bold,
          marginTop: SPACING.xs,
          letterSpacing: 0.5,
        },
        tabBarItemStyle: {
          paddingVertical: SPACING.xs,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="🏠" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="🛒" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="👤" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabIcon = ({ icon, color, focused }: { icon: string; color: string; focused: boolean }) => {
  const { View, Text } = require('react-native');
  
  return (
    <View style={[
      tabIconStyles.container,
      focused && tabIconStyles.containerFocused
    ]}>
      <Text style={[
        tabIconStyles.icon,
        focused && tabIconStyles.iconFocused
      ]}>
        {icon}
      </Text>
    </View>
  );
};

const tabIconStyles = StyleSheet.create({
  container: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  containerFocused: {
    backgroundColor: COLORS.primarySoft,
  },
  icon: {
    fontSize: TYPOGRAPHY.xxl + 4,
  },
  iconFocused: {
    fontSize: TYPOGRAPHY.xxxl,
  },
});

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
