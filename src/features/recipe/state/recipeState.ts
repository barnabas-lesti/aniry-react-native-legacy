import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppRootState } from 'app/store/models';
import { appState } from 'app/state';
import { appCollectionService } from 'app/services';
import { Recipe } from '../models';

interface RecipeState {
  allRecipes: Recipe[] | null;
  searchString: string;
}

const recipeSlice = createSlice({
  name: 'recipe',

  initialState: {
    allRecipes: null,
    searchString: '',
  } as RecipeState,

  reducers: {
    setAllRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.allRecipes = action.payload;
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
  },
});

const asyncActions = {
  /**
   * Loads recipes from storage.
   */
  loadRecipes: () => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    const {
      recipe: { allRecipes },
    } = getState();
    if (!allRecipes) {
      dispatch(
        recipeSlice.actions.setAllRecipes(
          (await appCollectionService.getAll<Recipe>('recipes')).map((recipe) => Recipe.serialize(recipe))
        )
      );
    }
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Creates a new recipe in storage.
   * @param recipe Recipe to create.
   */
  createRecipe: (recipe: Recipe) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    const {
      recipe: { allRecipes },
    } = getState();
    const createdRecipe = await appCollectionService.saveOne<Recipe>('recipes', recipe);
    dispatch(recipeSlice.actions.setAllRecipes([...(allRecipes || []), Recipe.serialize(createdRecipe)]));
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Updates a recipe in storage.
   * @param recipe Recipe to update.
   */
  updateRecipe: (recipe: Recipe) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    const {
      recipe: { allRecipes },
    } = getState();
    const updatedIngredient = await appCollectionService.saveOne<Recipe>('recipes', recipe);
    dispatch(
      recipeSlice.actions.setAllRecipes([
        ...(allRecipes || []).map((existingIngredient) =>
          existingIngredient.id === updatedIngredient.id ? Recipe.serialize(updatedIngredient) : existingIngredient
        ),
      ])
    );
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Removes a recipe from storage.
   * @param recipe Recipe to remove.
   */
  deleteRecipe:
    ({ id }: Recipe) =>
    async (dispatch: AppDispatch, getState: () => AppRootState) => {
      dispatch(appState.actions.startLoading());
      const {
        recipe: { allRecipes },
      } = getState();
      await appCollectionService.deleteOneById<Recipe>('recipes', id);
      dispatch(
        recipeSlice.actions.setAllRecipes([
          ...(allRecipes || []).filter((existingIngredient) => existingIngredient.id !== id),
        ])
      );
      dispatch(appState.actions.stopLoading());
    },
};

const selectors = {
  searchStringFilteredRecipes: createSelector(
    (recipe: RecipeState) => recipe,
    ({ allRecipes, searchString }) =>
      Recipe.sortByName(
        allRecipes
          ?.filter((recipe) => recipe.name.toLowerCase().search(searchString.toLowerCase()) !== -1)
          .map((recipe) => new Recipe(recipe)) || []
      )
  ),
};

export const recipeState = {
  ...recipeSlice,
  asyncActions,
  selectors,
};
