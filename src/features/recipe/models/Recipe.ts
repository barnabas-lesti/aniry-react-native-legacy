import { AppItem, AppItemBase, AppItemProxy, AppNutrients, AppServing, AppServingUnit } from 'app/models';
import { Ingredient } from 'features/ingredient/models';

interface RecipeProps {
  id: string;
  name: string;
  servings: AppServing[];
  ingredientProxies: AppItemProxy<Ingredient>[];
}

export class Recipe extends AppItemBase implements AppItem {
  static readonly DEFAULT_SERVING_UNIT: AppServingUnit = 'plate';
  static readonly DEFAULT_SERVING_VALUE: number = 1;
  static readonly AVAILABLE_SERVING_UNITS: AppServingUnit[] = ['plate', 'piece', 'g', 'ml'];

  id: string;
  name: string;
  servings: AppServing[];
  ingredientProxies: AppItemProxy<Ingredient>[];

  constructor(props?: RecipeProps) {
    super();

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

  static isIngredientInRecipe(recipe: Recipe, ingredient: Ingredient): boolean {
    return !!recipe.ingredientProxies.filter((ingredientProxy) => ingredientProxy.item.id === ingredient.id).length;
  }

  static updateIngredientInRecipe(recipe: Recipe, ingredient: Ingredient): Recipe {
    const recipeInstance = recipe instanceof Recipe ? recipe : new Recipe(recipe);
    const updatedIngredientProxies = recipeInstance.ingredientProxies.map((ingredientProxy) => {
      if (ingredientProxy.id === ingredient.id) {
        return new AppItemProxy<Ingredient>({
          item: ingredient,
          serving: { unit: ingredient.serving.unit, value: ingredientProxy.serving.value },
        });
      } else {
        return ingredientProxy;
      }
    });
    return new Recipe({ ...recipeInstance, ingredientProxies: updatedIngredientProxies });
  }

  static deleteIngredientFromRecipe(recipe: Recipe, ingredient: Ingredient): Recipe {
    const updatedIngredientProxies = recipe.ingredientProxies.filter(({ item }) => item.id !== ingredient.id);
    return new Recipe({ ...recipe, ingredientProxies: updatedIngredientProxies });
  }
}
