import { AppItemNutrients, AppItemServing } from 'app/models';

interface IngredientProps {
  id: string;
  name: string;
  serving: AppItemServing;
  nutrients: AppItemNutrients;
}

export class Ingredient {
  public id: string;
  public name: string;
  public serving: AppItemServing;
  public nutrients: AppItemNutrients;

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
