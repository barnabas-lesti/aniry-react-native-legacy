import { IngredientStackParamList } from './IngredientStackParamList';

export type IngredientScreenOptions = {
  name: keyof IngredientStackParamList;
  titleKey: string;
  Component: () => JSX.Element;
};
