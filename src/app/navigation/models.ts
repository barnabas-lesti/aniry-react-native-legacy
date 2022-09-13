import { Ingredient } from 'features/ingredients/models';

/**
 * App screen list type.
 * TODO: Add feature level screens to this type.
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
