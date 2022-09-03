import type { ScreenConfig } from './types';

import HomeScreen from '../components/home/HomeScreen';
import IngredientsScreen from '../components/ingredients/IngredientsScreen';

/**
 * Application screen configuration.
 */
export default [
  {
    name: 'Home',
    Component: HomeScreen,
    titleKey: 'screens.home.title',
  },
  {
    name: 'Ingredients',
    Component: IngredientsScreen,
    titleKey: 'screens.ingredients.title',
  },
] as ScreenConfig[];
