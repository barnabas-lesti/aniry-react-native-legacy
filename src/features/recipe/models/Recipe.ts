import { AppItemNutrients, AppItemServing } from 'app/models';
import { IngredientProxy } from 'features/ingredient/models';

export class Recipe {
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
}

interface RecipeProps {
  id: string;
  name: string;
  serving: AppItemServing;
  ingredientProxies: IngredientProxy[];
}
