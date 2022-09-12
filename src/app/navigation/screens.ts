// import { screens as homeScreens } from 'features/home/screens';
import { screens as ingredientsScreens } from 'features/ingredients/screens';
import type { AppScreen } from './models';

/**
 * Application screen configuration.
 * TODO: Add feature level screens to this object.
 */
export const screens = [
  // ...homeScreens,
  ...ingredientsScreens,
] as AppScreen[];
