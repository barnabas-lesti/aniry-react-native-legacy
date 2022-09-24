import { AppItem, AppItemNutrients, AppItemServing, appItemServingUnits } from 'app/models';
import { IngredientProxy } from 'features/ingredient/models';

interface RecipeProps {
  id: string;
  name: string;
  serving: AppItemServing;
  ingredientProxies: IngredientProxy[];
}

export class Recipe implements AppItem {
  public id: string;
  public name: string;
  public serving: AppItemServing;
  public ingredientProxies: IngredientProxy[];

  constructor(props?: RecipeProps) {
    const { serving, ingredientProxies } = props || {};

    this.id = props?.id || '';
    this.name = props?.name || '';
    this.serving = {
      unit: serving?.unit || 'plate',
      value: serving?.value || 0,
    };
    this.ingredientProxies =
      ingredientProxies?.map(
        ({ ingredient, serving: { value: servingValue } }) => new IngredientProxy({ ingredient, servingValue })
      ) || [];
  }

  get nutrients(): AppItemNutrients {
    return this.ingredientProxies.reduce(
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

  static validateServingUnit(value: string) {
    return !!appItemServingUnits.filter((unit) => unit === value)[0];
  }
}
