import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppRootState } from 'app/store/models';
import { appState } from 'app/state';
import { appCollectionService } from 'app/services';
import { recipeState } from 'features/recipe/state';
import { Ingredient } from '../models';

interface IngredientState {
  ingredients: Ingredient[] | null;
  ingredientHomeSearchString: string;
  ingredientSelectorDialogSearchString: string;
}

export const ingredientState = {
  ...createSlice({
    name: 'ingredient',

    initialState: {
      ingredients: null,
      ingredientHomeSearchString: '',
      ingredientSelectorDialogSearchString: '',
    } as IngredientState,

    reducers: {
      setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
        state.ingredients = action.payload;
      },
      addIngredientToIngredients(state, action: PayloadAction<Ingredient>) {
        state.ingredients = [...(state.ingredients || []), action.payload];
      },
      updateIngredientInIngredients(state, action: PayloadAction<Ingredient>) {
        const { payload: ingredientToUpdate } = action;
        state.ingredients = [
          ...(state.ingredients || []).map((ingredient) =>
            ingredient.id === ingredientToUpdate.id ? ingredientToUpdate : ingredient
          ),
        ];
      },
      deleteIngredientFromIngredients(state, action: PayloadAction<Ingredient>) {
        state.ingredients = [...(state.ingredients || []).filter((ingredient) => ingredient.id !== action.payload.id)];
      },

      setIngredientHomeSearchString: (state, action: PayloadAction<string>) => {
        state.ingredientHomeSearchString = action.payload;
      },

      setIngredientSelectorDialogSearchString: (state, action: PayloadAction<string>) => {
        state.ingredientSelectorDialogSearchString = action.payload;
      },
    },
  }),

  asyncActions: {
    /**
     * Loads all ingredients from storage.
     */
    loadIngredients: () => async (dispatch: AppDispatch) => {
      dispatch(appState.actions.startLoading());
      const ingredients = await appCollectionService.getAll<Ingredient>('ingredients');
      dispatch(
        ingredientState.actions.setIngredients(ingredients.map((ingredient) => Ingredient.serialize(ingredient)))
      );
      dispatch(appState.actions.stopLoading());
    },

    /**
     * Loads all ingredients from storage if not already set.
     */
    lazyLoadIngredients: () => async (dispatch: AppDispatch, getState: () => AppRootState) => {
      const state = getState();
      if (!state.ingredient.ingredients) {
        await dispatch(ingredientState.asyncActions.loadIngredients());
      }
    },

    /**
     * Creates a new ingredient in storage.
     * @param ingredient Ingredient to create.
     */
    createIngredient: (ingredient: Ingredient) => async (dispatch: AppDispatch) => {
      dispatch(appState.actions.startLoading());
      const createdIngredient = await appCollectionService.createOne('ingredients', ingredient);
      dispatch(ingredientState.actions.addIngredientToIngredients(Ingredient.serialize(createdIngredient)));
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
      dispatch(ingredientState.actions.updateIngredientInIngredients(Ingredient.serialize(updatedIngredient)));
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
      dispatch(ingredientState.actions.deleteIngredientFromIngredients(ingredient));
      dispatch(appState.actions.stopLoading());
    },
  },

  selectors: {
    ingredientHomeIngredients: createSelector(
      (ingredient: IngredientState) => ingredient,
      ({ ingredients, ingredientHomeSearchString }) =>
        searchStringFilterIngredients(ingredients || [], ingredientHomeSearchString)
    ),

    ingredientSelectorDialogIngredients: createSelector(
      (ingredient: IngredientState) => ingredient,
      ({ ingredients, ingredientSelectorDialogSearchString }) =>
        searchStringFilterIngredients(ingredients || [], ingredientSelectorDialogSearchString)
    ),
  },
};

function searchStringFilterIngredients(ingredients: Ingredient[], searchString: string): Ingredient[] {
  const filteredIngredients = (ingredients || []).filter(({ name }) => Ingredient.isStringInName(searchString, name));
  const ingredientInstances = filteredIngredients.map((ingredient) => new Ingredient(ingredient));
  return Ingredient.sortByName(ingredientInstances);
}
