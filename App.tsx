import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';

// Declare global type
declare global {
  var BASE_URL: string;
}

// Use globalThis instead of global
globalThis.BASE_URL = 'https://venue-entertainment-realty-territory.trycloudflare.com';

function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
