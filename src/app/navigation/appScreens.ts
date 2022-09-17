import { HomeScreen } from 'features/home';
import { IngredientsStackScreen } from 'features/ingredients';
import { appTabBarIconFactory } from './factories';
import { AppScreen } from './models';

export const appScreens = [
  {
    name: 'Home',
    titleKey: 'home.homeScreen.title',
    Component: HomeScreen,
    tabBarIcon: appTabBarIconFactory('home'),
  },
  {
    name: 'Ingredients',
    headerShown: false,
    Component: IngredientsStackScreen,
    tabBarIcon: appTabBarIconFactory('food-apple'),
  },
] as AppScreen[];
