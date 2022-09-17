import { Ingredient } from './Ingredient';

export type IngredientStackParamList = {
  IngredientHome: undefined;
  IngredientCreate: undefined;
  IngredientEdit: { ingredient: Ingredient };
};
