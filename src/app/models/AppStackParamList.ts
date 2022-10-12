import { Ingredient } from 'features/ingredient/models';
import { Recipe } from 'features/recipe/models';

/**
 * App screen list type.
 */
export type AppStackParamList = {
  DiaryHome: undefined;

  IngredientHome: undefined;
  IngredientCreate: undefined;
  IngredientEdit: { ingredient: Ingredient };

  RecipeHome: undefined;
  RecipeCreate: undefined;
  RecipeEdit: { recipe: Recipe };

  Settings: undefined;
};
