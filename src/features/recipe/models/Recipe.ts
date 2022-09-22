import { AppNutrients } from 'app/models';
import { IngredientProxy } from 'features/ingredient/models';
import { RecipeServing } from './RecipeServing';

export class Recipe {
  public id: string;
  public name: string;
  public serving: RecipeServing;
  public ingredientProxies: IngredientProxy[];

  constructor(props?: RecipeProps) {
    const { serving, ingredientProxies } = props || {};

    this.id = props?.id || '';
    this.name = props?.name || '';
    this.serving = {
      unit: serving?.unit || 'plate',
      value: serving?.value || 0,
    };
    this.ingredientProxies = ingredientProxies?.map((ingredientProxy) => new IngredientProxy(ingredientProxy)) || [];
  }

  get nutrients(): AppNutrients {
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
  serving: RecipeServing;
  ingredientProxies: IngredientProxy[];
}
