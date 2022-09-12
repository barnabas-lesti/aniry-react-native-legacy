export type AppStackParamList = {
  Home: undefined;
  Ingredients: undefined;
  EditIngredient: undefined;
};

export type AppScreen = {
  name: keyof AppStackParamList;
  Component: () => JSX.Element;
  titleKey: string;
};
