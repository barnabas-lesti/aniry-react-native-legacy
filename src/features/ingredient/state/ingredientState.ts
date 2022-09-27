import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppRootState } from 'app/store/models';
import { appState } from 'app/state';
import { Ingredient } from '../models';
import { appCollectionService } from 'app/services';

interface IngredientState {
  allIngredients: Ingredient[] | null;
  ingredientHomeSearchString: string;
}

const ingredientSlice = createSlice({
  name: 'ingredient',

  initialState: {
    allIngredients: null,
    ingredientHomeSearchString: '',
  } as IngredientState,

  reducers: {
    setAllIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.allIngredients = action.payload;
    },
    setIngredientHomeSearchString: (state, action: PayloadAction<string>) => {
      state.ingredientHomeSearchString = action.payload;
    },
  },
});

const asyncActions = {
  loadIngredients: () => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    const {
      ingredient: { allIngredients },
    } = getState();

    dispatch(appState.actions.startLoading());
    if (!allIngredients) {
      const ingredients = await appCollectionService.getAll<Ingredient>('ingredients');
      dispatch(ingredientSlice.actions.setAllIngredients(Ingredient.sortIngredientsByName(ingredients)));
    }
    dispatch(appState.actions.stopLoading());
  },
};

const selectors = {
  ingredientHomeIngredients: createSelector(
    (ingredient: IngredientState) => ingredient,
    ({ allIngredients, ingredientHomeSearchString }) =>
      allIngredients?.filter(
        (ingredient) => ingredient.name.toLowerCase().search(ingredientHomeSearchString.toLowerCase()) !== -1
      ) || []
  ),
};

export const ingredientState = {
  ...ingredientSlice,
  asyncActions,
  selectors,
};
