import { AppScreenOptions } from './AppScreenOptions';

export interface AppScreenOptionsGroup {
  name: 'ingredient' | 'recipe' | 'diary' | 'settings';
  icon: string;
  color: string;
  screens: AppScreenOptions[];
}
