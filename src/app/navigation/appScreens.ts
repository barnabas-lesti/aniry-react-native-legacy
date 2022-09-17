import { HomeScreen } from 'features/home';
import { IngredientsScreen } from 'features/ingredients';
import { appTabBarIconFactory } from './factories';
import { AppScreen } from './models';

export const appScreens = [
  {
    name: 'Home',
    Component: HomeScreen,
    titleKey: 'home.homeScreen.title',
    tabBarIcon: appTabBarIconFactory('home'),
  },
  {
    name: 'Ingredients',
    Component: IngredientsScreen,
    titleKey: 'ingredients.ingredientsScreen.title',
    tabBarIcon: appTabBarIconFactory('food-apple'),
  },
] as AppScreen[];
