import { RecipeStackParamList } from './RecipeStackParamList';

export type RecipeScreenOptions = {
  name: keyof RecipeStackParamList;
  titleKey: string;
  Component: () => JSX.Element;
};
