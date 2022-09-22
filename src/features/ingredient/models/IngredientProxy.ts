import { AppNutrients } from 'app/models';
import { Ingredient } from './Ingredient';

export class IngredientProxy {
  public ingredient: Ingredient;
  public serving: IngredientProxyServing;

  constructor(props: IngredientProxyProps) {
    this.ingredient = props.ingredient;
    this.serving = {
      value: props.serving.value,
    };
  }

  get id() {
    return this.ingredient.id;
  }

  get nutrients(): AppNutrients {
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
}

interface IngredientProxyProps {
  serving: IngredientProxyServing;
  ingredient: Ingredient;
}

interface IngredientProxyServing {
  value: number;
}
