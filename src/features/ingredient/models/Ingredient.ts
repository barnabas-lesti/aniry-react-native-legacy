import { AppNutrients, AppServing, AppItem, AppServingUnit, AppItemBase } from 'app/models';

interface IngredientProps {
  id: string;
  name: string;
  nutrients: AppNutrients;
  servings: AppServing[];
}

export class Ingredient extends AppItemBase implements AppItem {
  static readonly DEFAULT_SERVING_UNIT: AppServingUnit = 'g';
  static readonly DEFAULT_SERVING_VALUE: number = 100;
  static readonly PRIMARY_SERVING_UNITS: AppServingUnit[] = ['g', 'ml'];

  public id: string;
  public name: string;
  public nutrients: AppNutrients;
  public servings: AppServing[];

  constructor(props?: IngredientProps) {
    super();

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
}
