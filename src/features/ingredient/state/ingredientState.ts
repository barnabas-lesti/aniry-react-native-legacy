import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppRootState } from 'app/store/models';
import { appState } from 'app/state';
import { appCollectionService } from 'app/services';
import { Ingredient } from '../models';

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
  /**
   * Loads ingredients from storage.
   */
  loadIngredients: () => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    const {
      ingredient: { allIngredients },
    } = getState();
    if (!allIngredients) {
      dispatch(ingredientSlice.actions.setAllIngredients(await appCollectionService.getAll<Ingredient>('ingredients')));
    }
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Creates a new ingredient in storage.
   * @param ingredient Ingredient to create.
   */
  createIngredient: (ingredient: Ingredient) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    const {
      ingredient: { allIngredients },
    } = getState();
    const createdIngredient = await appCollectionService.saveOne<Ingredient>('ingredients', ingredient);
    dispatch(ingredientSlice.actions.setAllIngredients([...(allIngredients || []), createdIngredient]));
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Updates an ingredient in storage.
   * @param ingredient Ingredient to update.
   */
  updateIngredient: (ingredient: Ingredient) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    dispatch(appState.actions.startLoading());
    await dispatch(appState.asyncActions.sleep(1000));
    const {
      ingredient: { allIngredients },
    } = getState();
    const updatedIngredient = await appCollectionService.saveOne<Ingredient>('ingredients', ingredient);
    dispatch(
      ingredientSlice.actions.setAllIngredients([
        ...(allIngredients || []).map((existingIngredient) =>
          existingIngredient.id === updatedIngredient.id ? updatedIngredient : existingIngredient
        ),
      ])
    );
    // TODO: Update ingredient in recipes too.
    dispatch(appState.actions.stopLoading());
  },

  /**
   * Removes an ingredient from storage.
   * @param ingredient Ingredient to remove.
   */
  deleteIngredient:
    ({ id }: Ingredient) =>
    async (dispatch: AppDispatch, getState: () => AppRootState) => {
      dispatch(appState.actions.startLoading());
      await dispatch(appState.asyncActions.sleep(1000));
      const {
        ingredient: { allIngredients },
      } = getState();
      await appCollectionService.deleteOneById<Ingredient>('ingredients', id);
      dispatch(
        ingredientSlice.actions.setAllIngredients([
          ...(allIngredients || []).filter((existingIngredient) => existingIngredient.id !== id),
        ])
      );
      // TODO: Remove ingredient in recipes too.
      dispatch(appState.actions.stopLoading());
    },
};

const selectors = {
  ingredientHomeIngredients: createSelector(
    (ingredient: IngredientState) => ingredient,
    ({ allIngredients, ingredientHomeSearchString }) =>
      Ingredient.sortIngredientsByName(
        allIngredients?.filter(
          (ingredient) => ingredient.name.toLowerCase().search(ingredientHomeSearchString.toLowerCase()) !== -1
        ) || []
      )
  ),
};

export const ingredientState = {
  ...ingredientSlice,
  asyncActions,
  selectors,
};
