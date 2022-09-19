import { AppNutrients } from 'app/models';
import { IngredientServing } from './IngredientServing';

export class Ingredient {
  public id: string;
  public name: string;
  public serving: IngredientServing;
  public nutrients: AppNutrients;

  constructor(props?: IngredientProps) {
    const { serving, nutrients } = props || {};

    this.id = props?.id || '';
    this.name = props?.name || '';
    this.serving = {
      unit: serving?.unit || 'g',
      value: serving?.value || 0,
    };
    this.nutrients = {
      calories: nutrients?.calories || 0,
      carbs: nutrients?.carbs || 0,
      protein: nutrients?.protein || 0,
      fat: nutrients?.fat || 0,
    };
  }
}

interface IngredientProps {
  id: string;
  name: string;
  serving: IngredientServing;
  nutrients: AppNutrients;
}
