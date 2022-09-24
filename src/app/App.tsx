import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { AppNotifications } from './components';
import { AppStackScreen } from './screens';
import { appLocalizationService } from './services';
import { appTheme } from './theme';

appLocalizationService.createInstance();

/**
 * Main entrypoint of the application.
 */
export function App() {
  return (
    <PaperProvider theme={appTheme}>
      <AppStackScreen />
      <AppNotifications />
    </PaperProvider>
  );
}
