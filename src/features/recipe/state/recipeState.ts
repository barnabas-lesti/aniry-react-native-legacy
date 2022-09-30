import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppRootState } from 'app/store/models';
import { appState } from 'app/state';
import { appCollectionService } from 'app/services';
import { Ingredient } from 'features/ingredient/models';
import { Recipe } from '../models';

interface RecipeState {
  recipes: Recipe[] | null;
  recipeHomeSearchString: string;
}

export const recipeState = {
  ...createSlice({
    name: 'recipe',

    initialState: {
      recipes: null,
      recipeHomeSearchString: '',
    } as RecipeState,

    reducers: {
      setRecipes: (state, action: PayloadAction<Recipe[]>) => {
        state.recipes = action.payload;
      },
      addRecipeToRecipes(state, action: PayloadAction<Recipe>) {
        state.recipes = [...(state.recipes || []), action.payload];
      },
      updateRecipeInRecipes(state, action: PayloadAction<Recipe>) {
        const { payload: recipeToUpdate } = action;
        state.recipes = [
          ...(state.recipes || []).map((recipe) => (recipe.id === recipeToUpdate.id ? recipeToUpdate : recipe)),
        ];
      },
      updateRecipesInRecipes(state, action: PayloadAction<Recipe[]>) {
        const { payload: recipesToUpdate } = action;
        const updatedItems = (state.recipes || []).map(
          (existingRecipe) =>
            recipesToUpdate.filter((recipeToUpdate) => recipeToUpdate.id === existingRecipe.id)[0] || existingRecipe
        );
        state.recipes = [...updatedItems];
      },
      deleteRecipeFromRecipes(state, action: PayloadAction<Recipe>) {
        state.recipes = [...(state.recipes || []).filter((recipe) => recipe.id !== action.payload.id)];
      },

      setRecipeHomeSearchString: (state, action: PayloadAction<string>) => {
        state.recipeHomeSearchString = action.payload;
      },
    },
  }),

  asyncActions: {
    /**
     * Loads recipes from storage.
     */
    loadRecipes: () => async (dispatch: AppDispatch) => {
      dispatch(appState.actions.startLoading());
      const recipes = await appCollectionService.getAll<Recipe>('recipes');
      dispatch(recipeState.actions.setRecipes(recipes.map((recipe) => Recipe.serialize(recipe))));
      dispatch(appState.actions.stopLoading());
    },

    /**
     * Loads recipes if not already set.
     */
    lazyLoadRecipes: () => async (dispatch: AppDispatch, getState: () => AppRootState) => {
      const state = getState();
      if (!state.recipe.recipes) {
        await dispatch(recipeState.asyncActions.loadRecipes());
      }
    },

    /**
     * Creates a new recipe in storage.
     * @param recipe Recipe to create.
     */
    createRecipe: (recipe: Recipe) => async (dispatch: AppDispatch) => {
      dispatch(appState.actions.startLoading());
      const createdRecipe = await appCollectionService.createOne<Recipe>('recipes', recipe);
      dispatch(recipeState.actions.addRecipeToRecipes(Recipe.serialize(createdRecipe)));
      dispatch(appState.actions.stopLoading());
    },

    /**
     * Updates a recipe in storage.
     * @param recipe Recipe to update.
     */
    updateRecipe: (recipe: Recipe) => async (dispatch: AppDispatch) => {
      dispatch(appState.actions.startLoading());
      const updatedRecipe = await appCollectionService.updateOne<Recipe>('recipes', recipe);
      dispatch(recipeState.actions.updateRecipeInRecipes(Recipe.serialize(updatedRecipe)));
      dispatch(appState.actions.stopLoading());
    },

    /**
     * Removes a recipe from storage.
     * @param recipe Recipe to remove.
     */
    deleteRecipe: (recipe: Recipe) => async (dispatch: AppDispatch) => {
      dispatch(appState.actions.startLoading());
      await appCollectionService.deleteOne<Recipe>('recipes', recipe);
      dispatch(recipeState.actions.deleteRecipeFromRecipes(recipe));
      dispatch(appState.actions.stopLoading());
    },

    /**
     * Updates the ingredient in all recipes where present.
     * @param ingredient Ingredient to update.
     */
    updateIngredientInRecipes:
      (ingredient: Ingredient) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
        dispatch(appState.actions.startLoading());
        await dispatch(recipeState.asyncActions.lazyLoadRecipes());
        const state = getState();

        const recipesToUpdate = (state.recipe.recipes || [])
          .map(
            (recipe) =>
              Recipe.isIngredientInRecipe(recipe, ingredient) && Recipe.updateIngredientInRecipe(recipe, ingredient)
          )
          .filter((recipe) => !!recipe) as Recipe[];

        await appCollectionService.updateMany('recipes', recipesToUpdate);
        dispatch(recipeState.actions.updateRecipesInRecipes(recipesToUpdate.map((recipe) => Recipe.serialize(recipe))));
        dispatch(appState.actions.stopLoading());
      },

    /**
     * Removes the provided ingredient from all recipes where present.
     * @param ingredient Ingredient to remove from recipe.
     */
    deleteIngredientFromRecipes:
      (ingredient: Ingredient) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
        dispatch(appState.actions.startLoading());
        await dispatch(recipeState.asyncActions.lazyLoadRecipes());
        const state = getState();

        const recipesToUpdate = (state.recipe.recipes || [])
          .map(
            (recipe) =>
              Recipe.isIngredientInRecipe(recipe, ingredient) && Recipe.deleteIngredientFromRecipe(recipe, ingredient)
          )
          .filter((recipe) => !!recipe) as Recipe[];

        await appCollectionService.updateMany('recipes', recipesToUpdate);
        dispatch(recipeState.actions.updateRecipesInRecipes(recipesToUpdate.map((recipe) => Recipe.serialize(recipe))));
        dispatch(appState.actions.stopLoading());
      },
  },

  selectors: {
    recipeHomeRecipes: createSelector(
      (recipe: RecipeState) => recipe,
      ({ recipes, recipeHomeSearchString }) =>
        Recipe.sortByName(
          recipes
            ?.filter(({ name }) => Recipe.isStringInName(recipeHomeSearchString, name))
            .map((recipe) => new Recipe(recipe)) || []
        )
    ),
  },
};
