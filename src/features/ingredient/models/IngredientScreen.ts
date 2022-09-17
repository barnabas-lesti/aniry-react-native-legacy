import { IngredientStackParamList } from './IngredientStackParamList';

export type IngredientScreen = {
  name: keyof IngredientStackParamList;
  titleKey: string;
  Component: () => JSX.Element;
};
