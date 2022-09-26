import { AppNutrients, AppServing, AppItem, AppServingUnit, appServingUnits } from 'app/models';

type IngredientProps = {
  id: string;
  name: string;
  nutrients: AppNutrients;
  servings: AppServing[];
};

export class Ingredient implements AppItem {
  static readonly DEFAULT_SERVING_UNIT: AppServingUnit = 'g';
  static readonly DEFAULT_SERVING_VALUE: number = 100;
  static readonly PRIMARY_SERVING_UNITS: AppServingUnit[] = ['g', 'ml'];
  static readonly SECONDARY_SERVING_UNITS: AppServingUnit[] = [
    ...appServingUnits.filter((unit) => !this.PRIMARY_SERVING_UNITS.includes(unit)),
  ];

  public id: string;
  public name: string;
  public nutrients: AppNutrients;
  public servings: AppServing[];

  constructor(props?: IngredientProps) {
    const { servings, nutrients } = props || {};

    this.id = props?.id || '';
    this.name = props?.name || '';

    this.servings = servings || [
      new AppServing({ unit: Ingredient.DEFAULT_SERVING_UNIT, value: Ingredient.DEFAULT_SERVING_VALUE }),
    ];

    this.nutrients = {
      calories: nutrients?.calories || 0,
      carbs: nutrients?.carbs || 0,
      protein: nutrients?.protein || 0,
      fat: nutrients?.fat || 0,
    };
  }

  get serving() {
    return this.servings[0];
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
}
