import { Ingredient } from 'features/ingredients/models';

/**
 * App screen list type.
 */
export type AppStackParamList = {
  Home: undefined;
  Ingredients: undefined;
  EditIngredient: { ingredient: Ingredient } | undefined;
};

export type AppScreen = {
  name: keyof AppStackParamList;
  Component: () => JSX.Element;
  titleKey: string;
};
