import { AppTabParamList } from './AppTabParamList';

export interface AppTabScreenOptions {
  name: keyof AppTabParamList;
  color: string;
  icon: string;
  Component: () => JSX.Element;
}
