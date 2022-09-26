import { AppNutrients, AppServing, AppItem, appServingUnitsAvailable } from 'app/models';

interface IngredientProps {
  id: string;
  name: string;
  serving: AppServing;
  nutrients: AppNutrients;
}

export class Ingredient implements AppItem {
  public id: string;
  public name: string;
  public serving: AppServing;
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

  /**
   * Sorts the ingredients by their name property.
   * @param ingredients Ingredients to sort.
   * @returns Sorted ingredients array.
   */
  static sortIngredientsByName(ingredients: Ingredient[]) {
    return [
      ...ingredients.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }),
    ];
  }

  static validateName(value: string) {
    return !!value;
  }

  static validateServingValue(value: number) {
    return value > 0;
  }

  static validateServingUnit(value: string) {
    return !!appServingUnitsAvailable.filter((unit) => unit === value)[0];
  }
}
