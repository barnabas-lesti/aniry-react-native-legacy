// import { HomeScreen } from 'features/home';
import { EditIngredientScreen, IngredientsScreen } from 'features/ingredients';
import type { AppScreen } from './models';

/**
 * Application screen configuration.
 */
export const screens = [
  // {
  //   name: 'Home',
  //   Component: HomeScreen,
  //   titleKey: 'home.homeScreen.title',
  // },

  {
    name: 'Ingredients',
    Component: IngredientsScreen,
    titleKey: 'ingredients.ingredientsScreen.title',
  },
  {
    name: 'EditIngredient',
    Component: EditIngredientScreen,
    titleKey: 'ingredients.editIngredient.title',
  },
] as AppScreen[];
