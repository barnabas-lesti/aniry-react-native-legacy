import { AppItem, AppItemNutrients, AppItemServing } from 'app/models';
import { Ingredient } from './Ingredient';

interface IngredientProxyProps {
  ingredient: Ingredient;
  servingValue: number;
}

export class IngredientProxy implements AppItem {
  public ingredient: Ingredient;
  public serving: AppItemServing;

  constructor(props: IngredientProxyProps) {
    this.ingredient = props.ingredient;
    this.serving = {
      value: props.servingValue,
      unit: this.ingredient.serving.unit,
    };
  }

  get id() {
    return this.ingredient.id;
  }

  get name() {
    return this.ingredient.name;
  }

  get nutrients(): AppItemNutrients {
    const {
      serving: { value },
      nutrients: { calories, carbs, protein, fat },
    } = this.ingredient;
    return {
      calories: (calories / value) * this.serving.value,
      carbs: (carbs / value) * this.serving.value,
      protein: (protein / value) * this.serving.value,
      fat: (fat / value) * this.serving.value,
    };
  }

  static mapIngredientsToIngredientProxies(
    ingredients: Ingredient[],
    existingIngredientProxies: IngredientProxy[] = []
  ): IngredientProxy[] {
    return [
      ...ingredients.map((ingredient) => {
        const existingIngredientProxy = existingIngredientProxies.filter(
          ({ ingredient: { id } }) => ingredient.id === id
        )[0];
        return new IngredientProxy({
          ingredient,
          servingValue: existingIngredientProxy?.serving.value || ingredient.serving.value,
        });
      }),
    ];
  }
}
