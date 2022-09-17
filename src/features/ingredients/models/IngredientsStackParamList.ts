import { Ingredient } from './Ingredient';

export type IngredientsStackParamList = {
  IngredientsHome: undefined;
  CreateIngredient: undefined;
  EditIngredient: { ingredient: Ingredient };
};
