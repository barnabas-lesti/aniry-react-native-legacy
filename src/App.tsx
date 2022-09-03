import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContent } from './navigation';
import { store } from './store';
import './i18n';

/**
 * Main entrypoint of the application.
 * @returns Rendered application.
 */
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContent />
    </Provider>
  );
}
