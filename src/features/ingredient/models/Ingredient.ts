import { AppNutrients, AppServing, AppItem, AppServingUnit, AppItemBase } from 'app/models';
import { appTheme } from 'app/theme';

interface IngredientProps {
  id: string;
  name: string;
  nutrients: AppNutrients;
  servings: AppServing[];
  description?: string;
}

export class Ingredient extends AppItemBase implements AppItem {
  static readonly DEFAULT_SERVING_UNIT: AppServingUnit = 'g';
  static readonly DEFAULT_SERVING_VALUE: number = 100;
  static readonly PRIMARY_SERVING_UNITS: AppServingUnit[] = ['g', 'ml'];

  id: string;
  name: string;
  nutrients: AppNutrients;
  servings: AppServing[];
  description?: string;

  constructor(props?: IngredientProps) {
    super();

    const { servings, nutrients, description } = props || {};

    this.id = props?.id || '';
    this.name = props?.name || '';
    this.description = description;

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

  get icon() {
    return appTheme.icons.ingredient;
  }

  get color() {
    return appTheme.colors.ingredientPrimary;
  }
}
