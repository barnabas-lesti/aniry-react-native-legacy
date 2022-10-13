import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppLayoutNotifications } from './components';
import { AppTabScreen } from './screens';
import { appLocalizationService } from './services';
import { appTheme } from './theme';
import { appStore } from './store';

appLocalizationService.createInstance();

/**
 * Main entrypoint of the application.
 */
export function App() {
  return (
    <StoreProvider store={appStore}>
      <SafeAreaProvider>
        <PaperProvider theme={appTheme}>
          <AppTabScreen />
          <AppLayoutNotifications />
        </PaperProvider>
      </SafeAreaProvider>
    </StoreProvider>
  );
}
