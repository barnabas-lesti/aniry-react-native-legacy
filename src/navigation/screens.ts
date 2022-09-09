// import HomeScreen from '../components/home/HomeScreen';
// import IngredientsScreen from '../components/ingredients/IngredientsScreen';
import EditIngredientScreen from '../components/ingredients/EditIngredientScreen';
import type { ScreenConfig } from './types';

/**
 * Application screen configuration.
 */
export default [
  // {
  //   name: 'Home',
  //   Component: HomeScreen,
  //   titleKey: 'screens.home.title',
  // },
  // {
  //   name: 'Ingredients',
  //   Component: IngredientsScreen,
  //   titleKey: 'screens.ingredients.title',
  // },
  {
    name: 'EditIngredient',
    Component: EditIngredientScreen,
    titleKey: 'screens.editIngredient.title',
  },
] as ScreenConfig[];
