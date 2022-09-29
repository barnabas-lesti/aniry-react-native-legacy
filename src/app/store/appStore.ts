import { configureStore } from '@reduxjs/toolkit';

import { appState } from '../state';
import { ingredientState } from 'features/ingredient/state';
import { recipeState } from 'features/recipe/state';

export const appStore = configureStore({
  reducer: {
    app: appState.reducer,
    ingredient: ingredientState.reducer,
    recipe: recipeState.reducer,
  },
});
