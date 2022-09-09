export interface Ingredient {
  name: string;
  serving: Serving;
  nutrients: Nutrients;
}

interface Serving {
  value: number;
  unit: ServingUnit;
}

type ServingUnit = 'g' | 'ml';

interface Nutrients {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}
