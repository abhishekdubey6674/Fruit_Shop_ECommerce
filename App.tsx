import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';

global.BASE_URL = 'https://cbs-inc-electronic-marine.trycloudflare.com';

function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
