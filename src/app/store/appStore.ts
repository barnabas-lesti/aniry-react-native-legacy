import { configureStore } from '@reduxjs/toolkit';

import { appStateReducer } from '../state';

export const appStore = configureStore({
  reducer: {
    app: appStateReducer,
  },
});
