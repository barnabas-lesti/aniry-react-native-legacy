import { AppNutrients } from 'app/models';
import { Ingredient } from './Ingredient';
import { IngredientServing } from './IngredientServing';

export class IngredientProxy {
  public serving: IngredientServing;
  public ingredient: Ingredient;

  constructor(props: IngredientProxyProps) {
    this.ingredient = props.ingredient;
    this.serving = {
      unit: this.ingredient.serving.unit,
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
  serving: {
    value: number;
  };
  ingredient: Ingredient;
}
