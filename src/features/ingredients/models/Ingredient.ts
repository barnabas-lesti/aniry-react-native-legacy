import { appUidService } from 'app/services';
import { ServingUnit } from './ServingUnit';

export class Ingredient {
  public id: string;
  public name: string;
  public serving: Serving;
  public nutrients: Nutrients;

  constructor(props?: IngredientProps) {
    const { serving, nutrients } = props || {};

    this.id = props?.id || appUidService.generateID();
    this.name = props?.name || '';
    this.serving = {
      unit: serving?.unit || 'g',
      value: serving?.value || 0,
    };
    this.nutrients = {
      calories: nutrients?.calories || 0,
      carbs: nutrients?.carbs || 0,
      protein: nutrients?.protein || 0,
      fat: nutrients?.fat || 0,
    };
  }
}

interface Serving {
  value: number;
  unit: ServingUnit;
}

interface Nutrients {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

interface IngredientProps {
  id: string;
  name: string;
  serving: Serving;
  nutrients: Nutrients;
}
