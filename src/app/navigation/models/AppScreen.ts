import { AppStackParamList } from './AppStackParamList';

/**
 * App screen type.
 */
export type AppScreen = {
  name: keyof AppStackParamList;
  Component: () => JSX.Element;
  titleKey: string;
};
