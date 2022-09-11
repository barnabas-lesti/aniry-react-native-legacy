export interface Ingredient {
  name: string;
  serving: Serving;
  nutrients: Nutrients;
}

export type ServingUnit = 'g' | 'ml';

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
