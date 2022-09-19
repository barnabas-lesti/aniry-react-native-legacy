import { AppServing } from 'app/models';

export class Recipe {
  public id: string;
  public name: string;
  public serving: AppServing;

  constructor(props?: RecipeProps) {
    const { serving } = props || {};

    this.id = props?.id || '';
    this.name = props?.name || '';
    this.serving = {
      unit: serving?.unit || 'g',
      value: serving?.value || 0,
    };
  }
}

interface RecipeProps {
  id: string;
  name: string;
  serving: AppServing;
}
