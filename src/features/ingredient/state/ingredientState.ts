import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppRootState } from 'app/store/models';
import { appState } from 'app/state';
import { appCollectionService } from 'app/services';
import { recipeState } from 'features/recipe/state';
import { Ingredient } from '../models';

interface IngredientState {
  allIngredients: Ingredient[] | null;
  searchString: string;
}

const ingredientSlice = createSlice({
  name: 'ingredient',

  initialState: {
    allIngredients: null,
    searchString: '',
  } as IngredientState,

  reducers: {
    setAllIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.allIngredients = action.payload;
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
  },
});

const asyncActions = {
  /**
   * Loads all ingredients from storage.
   */
  loadAllIngredients: () => async (dispatch: AppDispatch) => {
    dispatch(appState.actions.startLoading());
    const ingredients = await appCollectionService.getAll<Ingredient>('ingredients');
    const serializedIngredients = ingredients.map((ingredient) => Ingredient.serialize(ingredient));
    dispatch(ingredientSlice.actions.setAllIngredients(serializedIngredients));
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Loads all ingredients from storage if not already set.
   */
  lazyLoadAllIngredients: () => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    const state = getState();
    if (!state.ingredient.allIngredients) {
      await dispatch(asyncActions.loadAllIngredients());
    }
  },

  /**
   * Creates a new ingredient in storage.
   * @param ingredient Ingredient to create.
   */
  createIngredient: (ingredient: Ingredient) => async (dispatch: AppDispatch) => {
    dispatch(appState.actions.startLoading());
    await appCollectionService.createOne('ingredients', ingredient);
    await dispatch(asyncActions.loadAllIngredients());
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Updates an ingredient in storage.
   * @param ingredient Ingredient to update.
   */
  updateIngredient: (ingredient: Ingredient) => async (dispatch: AppDispatch) => {
    dispatch(appState.actions.startLoading());
    const updatedIngredient = await appCollectionService.updateOne<Ingredient>('ingredients', ingredient);
    await dispatch(recipeState.asyncActions.updateIngredientInRecipes(updatedIngredient));
    await dispatch(asyncActions.loadAllIngredients());
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Removes an ingredient from storage.
   * @param ingredient Ingredient to remove.
   */
  deleteIngredient: (ingredient: Ingredient) => async (dispatch: AppDispatch) => {
    dispatch(appState.actions.startLoading());
    await appCollectionService.deleteOne<Ingredient>('ingredients', ingredient);
    await dispatch(recipeState.asyncActions.deleteIngredientFromRecipes(ingredient));
    await dispatch(asyncActions.loadAllIngredients());
    dispatch(appState.actions.stopLoading());
  },
};

const selectors = {
  searchStringFilteredIngredients: createSelector(
    (ingredient: IngredientState) => ingredient,
    ({ allIngredients, searchString }) => {
      const filteredIngredients = (allIngredients || []).filter(
        (ingredient) => ingredient.name.toLowerCase().search(searchString.toLowerCase()) !== -1
      );
      const ingredientInstances = filteredIngredients.map((ingredient) => new Ingredient(ingredient));
      return Ingredient.sortByName(ingredientInstances);
    }
  ),
};

export const ingredientState = {
  ...ingredientSlice,
  asyncActions,
  selectors,
};
