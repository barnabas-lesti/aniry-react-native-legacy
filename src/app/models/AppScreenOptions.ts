import { AppStackParamList } from './AppStackParamList';

export interface AppScreenOptions {
  name: keyof AppStackParamList;
  Component: (props?: any) => JSX.Element;
  titleKey: string;
}
