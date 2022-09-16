import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { AppNavigationContent } from './navigation';
import './i18n';

/**
 * Main entrypoint of the application.
 */
export function App() {
  return (
    <PaperProvider>
      <AppNavigationContent />
    </PaperProvider>
  );
}
