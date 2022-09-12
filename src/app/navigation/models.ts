/**
 * App screen list type.
 * TODO: Add feature level screens to this type.
 */
export type AppScreenList = {
  Home: undefined;
  Ingredients: undefined;
  EditIngredient: undefined;
};

export type AppScreen = {
  name: keyof AppScreenList;
  Component: () => JSX.Element;
  titleKey: string;
};
