import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

import { AppNotifications } from './components';
import { AppStackScreen } from './screens';
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
      <PaperProvider theme={appTheme}>
        <AppStackScreen />
        <AppNotifications />
      </PaperProvider>
    </StoreProvider>
  );
}
