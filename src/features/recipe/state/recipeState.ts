import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppRootState } from 'app/store/models';
import { appState } from 'app/state';
import { appCollectionService } from 'app/services';
import { Ingredient } from 'features/ingredient/models';
import { Recipe } from '../models';
import { AppItemProxy } from 'app/models';

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
    const state = getState();
    if (!state.recipe.allRecipes) {
      const recipes = await appCollectionService.getAll<Recipe>('recipes');
      const serializedRecipes = recipes.map((recipe) => Recipe.serialize(recipe));
      dispatch(recipeSlice.actions.setAllRecipes(serializedRecipes));
    }
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Creates a new recipe in storage.
   * @param recipe Recipe to create.
   */
  createRecipe: (recipe: Recipe) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    const state = getState();
    const createdRecipe = await appCollectionService.createOne<Recipe>('recipes', recipe);
    const updatedRecipes = [...(state.recipe.allRecipes || []), Recipe.serialize(createdRecipe)];
    dispatch(recipeSlice.actions.setAllRecipes(updatedRecipes));
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Updates a recipe in storage.
   * @param recipe Recipe to update.
   */
  updateRecipe: (recipe: Recipe) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    const state = getState();
    const updatedRecipe = await appCollectionService.updateOne<Recipe>('recipes', recipe);
    const updatedRecipes = [
      ...(state.recipe.allRecipes || []).map((existingRecipe) =>
        existingRecipe.id === updatedRecipe.id ? Recipe.serialize(updatedRecipe) : existingRecipe
      ),
    ];
    dispatch(recipeSlice.actions.setAllRecipes(updatedRecipes));
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Removes a recipe from storage.
   * @param recipe Recipe to remove.
   */
  deleteRecipe: (recipe: Recipe) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    const state = getState();
    await appCollectionService.deleteOne<Recipe>('recipes', recipe);
    const updatedRecipes = [
      ...(state.recipe.allRecipes || []).filter((existingIngredient) => existingIngredient.id !== recipe.id),
    ];
    dispatch(recipeSlice.actions.setAllRecipes(updatedRecipes));
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Updates the ingredient in all recipes where present.
   * @param ingredient Ingredient to update.
   */
  updateIngredientInRecipes:
    (ingredient: Ingredient) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
      dispatch(appState.actions.startLoading());
      await dispatch(asyncActions.loadRecipes());
      const state = getState();

      const recipesToUpdate: Recipe[] = [];
      const updatedRecipes = (state.recipe.allRecipes || [])
        .map((recipe) => new Recipe(recipe))
        .map((recipe) => {
          if (isIngredientInRecipe(ingredient, recipe)) {
            const updatedIngredientProxies = recipe.ingredientProxies.map((ingredientProxy) => {
              if (ingredientProxy.id === ingredient.id) {
                return new AppItemProxy<Ingredient>({
                  item: ingredient,
                  serving: { unit: ingredient.serving.unit, value: ingredientProxy.serving.value },
                });
              } else {
                return ingredientProxy;
              }
            });
            const updatedRecipe = new Recipe({ ...recipe, ingredientProxies: updatedIngredientProxies });
            recipesToUpdate.push(updatedRecipe);
            return updatedRecipe;
          } else {
            return recipe;
          }
        })
        .map((recipe) => Recipe.serialize(recipe));

      await appCollectionService.updateMany('recipes', recipesToUpdate);
      dispatch(recipeSlice.actions.setAllRecipes([...updatedRecipes]));
      dispatch(appState.actions.stopLoading());
    },

  /**
   * Removes the provided ingredient from all recipes where present.
   * @param ingredient Ingredient to remove from recipe.
   */
  deleteIngredientFromRecipes:
    (ingredient: Ingredient) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
      dispatch(appState.actions.startLoading());
      await dispatch(asyncActions.loadRecipes());
      const state = getState();

      const recipesToUpdate: Recipe[] = [];
      const updatedRecipes = (state.recipe.allRecipes || [])
        .map((recipe) => new Recipe(recipe))
        .map((recipe) => {
          if (isIngredientInRecipe(ingredient, recipe)) {
            const updatedIngredientProxies = recipe.ingredientProxies.filter(({ id }) => id !== ingredient.id);
            const updatedRecipe = new Recipe({ ...recipe, ingredientProxies: updatedIngredientProxies });
            recipesToUpdate.push(updatedRecipe);
            return updatedRecipe;
          } else {
            return recipe;
          }
        })
        .map((recipe) => Recipe.serialize(recipe));

      await appCollectionService.updateMany('recipes', recipesToUpdate);
      dispatch(recipeSlice.actions.setAllRecipes([...updatedRecipes]));
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

function isIngredientInRecipe(ingredient: Ingredient, recipe: Recipe): boolean {
  return !!recipe.ingredientProxies.filter((ingredientProxy) => ingredientProxy.id === ingredient.id).length;
}

export const recipeState = {
  ...recipeSlice,
  asyncActions,
  selectors,
};
