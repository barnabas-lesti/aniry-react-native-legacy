// import HomeScreen from '../components/home/HomeScreen';
import { IngredientsScreen } from 'src/components/ingredients/IngredientsScreen';
import { EditIngredientScreen } from 'src/components/ingredients/EditIngredientScreen';
import type { ScreenConfig } from './types';

/**
 * Application screen configuration.
 */
export const screens = [
  // {
  //   name: 'Home',
  //   Component: HomeScreen,
  //   titleKey: 'screens.home.title',
  // },
  {
    name: 'Ingredients',
    Component: IngredientsScreen,
    titleKey: 'screens.ingredients.title',
  },
  {
    name: 'EditIngredient',
    Component: EditIngredientScreen,
    titleKey: 'screens.editIngredient.title',
  },
] as ScreenConfig[];
