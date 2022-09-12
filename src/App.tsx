import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContent } from './navigation';
import { store } from './store';
import './i18n';

/**
 * Main entrypoint of the application.
 */
export function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContent />
      </Provider>
    </SafeAreaProvider>
  );
}
