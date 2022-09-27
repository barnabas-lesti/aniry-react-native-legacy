import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from './appState';

export const appStore = configureStore({
  reducer: {
    app: appReducer,
  },
});
