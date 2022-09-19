import { Ingredient, IngredientServing } from 'features/ingredient/models';

export interface RecipeIngredient {
  serving: IngredientServing;
  ingredient: Ingredient;
}
