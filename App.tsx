/**
 * Fruit Shop E-Commerce App
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';

// @ts-ignore
global.BASE_URL = 'https://month-shield-oils-prove.trycloudflare.com';

function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
