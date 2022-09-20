import { Ingredient } from './Ingredient';
import { IngredientServing } from './IngredientServing';

export interface IngredientProxy {
  serving: IngredientServing;
  ingredient: Ingredient;
}
