import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch } from 'app/store/models';
import { Ingredient } from 'features/ingredient/models';
import { ingredientState } from 'features/ingredient/state';
import { Recipe } from 'features/recipe/models';
import { recipeState } from 'features/recipe/state';

interface DiaryState {
  diaryFoodSelectorSearchString: string;
}

type PartialRootState = {
  ingredient: { ingredients: Ingredient[] | null };
  recipe: { recipes: Recipe[] | null };
  diary: DiaryState;
};

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
    diaryAllMealItems: createSelector(
      (state: PartialRootState) => ({
        ingredients: state.ingredient.ingredients,
        recipes: state.recipe.recipes,
      }),
      ({ ingredients, recipes }) => createMealItemList(ingredients || [], recipes || [])
    ),
    diaryFoodSelectorItems: createSelector(
      (state: PartialRootState) => ({
        ingredients: state.ingredient.ingredients,
        recipes: state.recipe.recipes,
        searchString: state.diary.diaryFoodSelectorSearchString,
      }),
      ({ ingredients, recipes, searchString }) => createMealItemList(ingredients || [], recipes || [], searchString)
    ),
  },
};

function createMealItemList(ingredients: Ingredient[], recipes: Recipe[], searchString?: string) {
  const ingredientInstances = (
    searchString ? ingredients.filter(({ name }) => Ingredient.isStringInName(searchString, name)) : ingredients
  ).map((ingredient) => new Ingredient(ingredient));
  const recipeInstances = (
    searchString ? recipes.filter(({ name }) => Recipe.isStringInName(searchString, name)) : recipes
  ).map((recipe) => new Recipe(recipe));
  return [...ingredientInstances, ...recipeInstances];
}
