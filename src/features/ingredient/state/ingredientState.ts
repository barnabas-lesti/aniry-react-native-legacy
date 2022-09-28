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
   * Loads ingredients from storage.
   */
  loadIngredients: () => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    const state = getState();
    if (!state.ingredient.allIngredients) {
      const ingredients = await appCollectionService.getAll<Ingredient>('ingredients');
      const serializedIngredients = ingredients.map((ingredient) => Ingredient.serialize(ingredient));
      dispatch(ingredientSlice.actions.setAllIngredients(serializedIngredients));
    }
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Creates a new ingredient in storage.
   * @param ingredient Ingredient to create.
   */
  createIngredient: (ingredient: Ingredient) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    const state = getState();
    const createdIngredient = await appCollectionService.createOne('ingredients', ingredient);
    const updatedIngredients = [...(state.ingredient.allIngredients || []), Ingredient.serialize(createdIngredient)];
    dispatch(ingredientSlice.actions.setAllIngredients(updatedIngredients));
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Updates an ingredient in storage.
   * @param ingredient Ingredient to update.
   */
  updateIngredient: (ingredient: Ingredient) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    const state = getState();

    const updatedIngredient = await appCollectionService.updateOne<Ingredient>('ingredients', ingredient);
    await dispatch(recipeState.asyncActions.updateIngredientInRecipes(updatedIngredient));

    const updatedIngredients = [
      ...(state.ingredient.allIngredients || []).map((existingIngredient) =>
        existingIngredient.id === updatedIngredient.id ? Ingredient.serialize(updatedIngredient) : existingIngredient
      ),
    ];
    dispatch(ingredientSlice.actions.setAllIngredients(updatedIngredients));

    dispatch(appState.actions.stopLoading());
  },

  /**
   * Removes an ingredient from storage.
   * @param ingredient Ingredient to remove.
   */
  deleteIngredient: (ingredient: Ingredient) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    const state = getState();
    await appCollectionService.deleteOne<Ingredient>('ingredients', ingredient);
    await dispatch(recipeState.asyncActions.deleteIngredientFromRecipes(ingredient));

    const updatedIngredients = [...(state.ingredient.allIngredients || []).filter(({ id }) => id !== ingredient.id)];
    dispatch(ingredientSlice.actions.setAllIngredients(updatedIngredients));
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
