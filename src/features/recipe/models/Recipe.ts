import { AppItem, AppItemProxy, AppNutrients, AppServing, AppServingUnit } from 'app/models';
import { Ingredient } from 'features/ingredient/models';

interface RecipeProps {
  id: string;
  name: string;
  servings: AppServing[];
  ingredientProxies: AppItemProxy<Ingredient>[];
}

export class Recipe implements AppItem {
  static readonly DEFAULT_SERVING_UNIT: AppServingUnit = 'plate';
  static readonly DEFAULT_SERVING_VALUE: number = 1;
  static readonly AVAILABLE_SERVING_UNITS: AppServingUnit[] = ['plate', 'piece', 'g', 'ml'];

  id: string;
  name: string;
  servings: AppServing[];
  ingredientProxies: AppItemProxy<Ingredient>[];

  constructor(props?: RecipeProps) {
    const { servings, ingredientProxies } = props || {};

    this.id = props?.id || '';
    this.name = props?.name || '';

    this.servings = servings || [
      new AppServing({ unit: Recipe.DEFAULT_SERVING_UNIT, value: Recipe.DEFAULT_SERVING_VALUE }),
    ];

    this.ingredientProxies =
      ingredientProxies?.map(
        ({ item, serving }) => new AppItemProxy<Ingredient>({ item: new Ingredient(item), serving })
      ) || [];
  }

  get serving() {
    return this.servings[0];
  }

  get nutrients(): AppNutrients {
    return Recipe.getNutrientsFromIngredientProxies(this.ingredientProxies);
  }

  /**
   * Sorts the recipes by their name property.
   * @param recipes Recipes to sort.
   * @returns Sorted recipes array.
   */
  static sortRecipesByName(recipes: Array<Recipe>) {
    return [
      ...recipes.sort((a, b) => {
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

  static getNutrientsFromIngredientProxies(ingredientProxies: AppItemProxy<Ingredient>[]): AppNutrients {
    return ingredientProxies.reduce(
      (nutrients, ingredientProxy) => ({
        calories: nutrients.calories + ingredientProxy.nutrients.calories,
        carbs: nutrients.carbs + ingredientProxy.nutrients.carbs,
        protein: nutrients.protein + ingredientProxy.nutrients.protein,
        fat: nutrients.fat + ingredientProxy.nutrients.fat,
      }),
      {
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      }
    );
  }
}
