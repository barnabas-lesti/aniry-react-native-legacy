import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppRootState } from 'app/store/models';
import { appState } from 'app/state';
import { appCollectionService } from 'app/services';
import { Ingredient } from 'features/ingredient/models';
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
  loadAllRecipes: () => async (dispatch: AppDispatch) => {
    dispatch(appState.actions.startLoading());
    const recipes = await appCollectionService.getAll<Recipe>('recipes');
    const serializedRecipes = recipes.map((recipe) => Recipe.serialize(recipe));
    dispatch(recipeSlice.actions.setAllRecipes(serializedRecipes));
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Loads recipes if not already set.
   */
  lazyLoadAllRecipes: () => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    const state = getState();
    if (!state.recipe.allRecipes) {
      await dispatch(asyncActions.loadAllRecipes());
    }
  },

  /**
   * Creates a new recipe in storage.
   * @param recipe Recipe to create.
   */
  createRecipe: (recipe: Recipe) => async (dispatch: AppDispatch) => {
    dispatch(appState.actions.startLoading());
    await appCollectionService.createOne<Recipe>('recipes', recipe);
    await dispatch(asyncActions.loadAllRecipes());
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Updates a recipe in storage.
   * @param recipe Recipe to update.
   */
  updateRecipe: (recipe: Recipe) => async (dispatch: AppDispatch) => {
    dispatch(appState.actions.startLoading());
    await appCollectionService.updateOne<Recipe>('recipes', recipe);
    await dispatch(asyncActions.loadAllRecipes());
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Removes a recipe from storage.
   * @param recipe Recipe to remove.
   */
  deleteRecipe: (recipe: Recipe) => async (dispatch: AppDispatch) => {
    dispatch(appState.actions.startLoading());
    await appCollectionService.deleteOne<Recipe>('recipes', recipe);
    await dispatch(asyncActions.loadAllRecipes());
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Updates the ingredient in all recipes where present.
   * @param ingredient Ingredient to update.
   */
  updateIngredientInRecipes:
    (ingredient: Ingredient) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
      dispatch(appState.actions.startLoading());
      await dispatch(asyncActions.lazyLoadAllRecipes());
      const state = getState();

      const recipesToUpdate = (state.recipe.allRecipes || [])
        .map(
          (recipe) =>
            Recipe.isIngredientInRecipe(recipe, ingredient) && Recipe.updateIngredientInRecipe(recipe, ingredient)
        )
        .filter((recipe) => !!recipe);

      await appCollectionService.updateMany('recipes', recipesToUpdate as Recipe[]);
      await dispatch(asyncActions.loadAllRecipes());
      dispatch(appState.actions.stopLoading());
    },

  /**
   * Removes the provided ingredient from all recipes where present.
   * @param ingredient Ingredient to remove from recipe.
   */
  deleteIngredientFromRecipes:
    (ingredient: Ingredient) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
      dispatch(appState.actions.startLoading());
      await dispatch(asyncActions.lazyLoadAllRecipes());
      const state = getState();

      const recipesToUpdate = (state.recipe.allRecipes || [])
        .map(
          (recipe) =>
            Recipe.isIngredientInRecipe(recipe, ingredient) && Recipe.deleteIngredientFromRecipe(recipe, ingredient)
        )
        .filter((recipe) => !!recipe);

      await appCollectionService.updateMany('recipes', recipesToUpdate as Recipe[]);
      await dispatch(asyncActions.loadAllRecipes());
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
