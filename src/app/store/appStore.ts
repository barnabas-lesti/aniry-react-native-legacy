import { configureStore } from '@reduxjs/toolkit';

import { appState } from '../state';
import { ingredientState } from 'features/ingredient/state';

export const appStore = configureStore({
  reducer: {
    app: appState.reducer,
    ingredient: ingredientState.reducer,
  },
});
