import { RecipeServing } from './RecipeServing';
import { RecipeIngredient } from './RecipeIngredient';

export class Recipe {
  public id: string;
  public name: string;
  public serving: RecipeServing;
  public ingredients: RecipeIngredient[];

  constructor(props?: RecipeProps) {
    const { serving, ingredients } = props || {};

    this.id = props?.id || '';
    this.name = props?.name || '';
    this.serving = {
      unit: serving?.unit || 'g',
      value: serving?.value || 0,
    };
    this.ingredients = ingredients || [];
  }
}

interface RecipeProps {
  id: string;
  name: string;
  serving: RecipeServing;
  ingredients: RecipeIngredient[];
}
