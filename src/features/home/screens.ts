import type { AppScreen } from 'app/models';
import { HomeScreen } from './components/HomeScreen';

/**
 * Home screen configuration.
 */
export const screens = [
  {
    name: 'Home',
    Component: HomeScreen,
    titleKey: 'home.homeScreen.title',
  },
] as AppScreen[];
