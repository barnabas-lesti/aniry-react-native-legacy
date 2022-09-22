import { RecipeServing } from './RecipeServing';
import { IngredientProxy } from 'features/ingredient/models';

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
}

interface RecipeProps {
  id: string;
  name: string;
  serving: RecipeServing;
  ingredientProxies: IngredientProxy[];
}
