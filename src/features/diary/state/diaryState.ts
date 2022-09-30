import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { AppItemBase } from 'app/models';
import { AppDispatch } from 'app/store/models';
import { Ingredient } from 'features/ingredient/models';
import { ingredientState } from 'features/ingredient/state';
import { Recipe } from 'features/recipe/models';
import { recipeState } from 'features/recipe/state';

interface DiaryState {
  diaryFoodSelectorSearchString: string;
}

type PartialRootState = { ingredient: { ingredients: Ingredient[] }; recipe: { recipes: Recipe[] }; diary: DiaryState };

export const diaryState = {
  ...createSlice({
    name: 'dairy',

    initialState: {
      diaryFoodSelectorSearchString: '',
    } as DiaryState,

    reducers: {
      setDiaryFoodSelectorSearchString: (state, action: PayloadAction<string>) => {
        state.diaryFoodSelectorSearchString = action.payload;
      },
    },
  }),

  asyncActions: {
    /**
     * Loads meal items.
     */
    loadMealItems: () => async (dispatch: AppDispatch) => {
      await Promise.all([
        dispatch(ingredientState.asyncActions.loadIngredients()),
        dispatch(recipeState.asyncActions.loadRecipes()),
      ]);
    },

    /**
     * Loads meal items if not already set.
     */
    lazyLoadMealItems: () => async (dispatch: AppDispatch) => {
      await Promise.all([
        dispatch(ingredientState.asyncActions.lazyLoadIngredients()),
        dispatch(recipeState.asyncActions.lazyLoadRecipes()),
      ]);
    },
  },

  selectors: {
    diaryFoodSelectorItems: createSelector(
      (state: PartialRootState) => ({
        ingredients: state.ingredient.ingredients,
        recipes: state.recipe.recipes,
        searchString: state.diary.diaryFoodSelectorSearchString,
      }),
      ({ ingredients, recipes, searchString }) => {
        const ingredientInstances =
          ingredients
            ?.filter(({ name }) => Ingredient.isStringInName(searchString, name))
            .map((recipe) => new Ingredient(recipe)) || [];
        const recipeInstances =
          recipes
            ?.filter(({ name }) => Recipe.isStringInName(searchString, name))
            .map((recipe) => new Recipe(recipe)) || [];
        return AppItemBase.sortByName([...ingredientInstances, ...recipeInstances]);
      }
    ),
  },
};
