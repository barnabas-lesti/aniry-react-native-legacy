import { configureStore } from '@reduxjs/toolkit';

import { appState } from '../state';

export const appStore = configureStore({
  reducer: {
    app: appState.reducer,
  },
});
