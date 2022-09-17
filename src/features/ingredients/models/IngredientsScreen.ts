import { IngredientsStackParamList } from './IngredientsStackParamList';

export type IngredientsScreen = {
  name: keyof IngredientsStackParamList;
  titleKey: string;
  Component: () => JSX.Element;
};
