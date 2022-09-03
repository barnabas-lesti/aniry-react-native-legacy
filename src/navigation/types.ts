export type RootStackParamList = {
  Home: undefined;
  Ingredients: undefined;
};

export type ScreenConfig = {
  name: keyof RootStackParamList;
  Component: () => JSX.Element;
  titleKey: string;
};
