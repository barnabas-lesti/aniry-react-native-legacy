import { Ingredient } from 'features/ingredients/models';

/**
 * App screen list type.
 */
export type AppStackParamList = {
  Home: undefined;
  Ingredients: undefined;
  EditIngredient: { ingredient: Ingredient } | undefined;
};
