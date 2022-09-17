import { IngredientsHomeScreen, EditIngredientScreen } from './components';
import { IngredientsScreen } from './models';

export const ingredientsScreens = [
  {
    name: 'IngredientsHome',
    titleKey: 'ingredients.ingredientsHomeScreen.title',
    Component: IngredientsHomeScreen,
  },
  {
    name: 'CreateIngredient',
    titleKey: 'ingredients.createIngredientScreen.title',
    Component: EditIngredientScreen,
  },
  {
    name: 'EditIngredient',
    titleKey: 'ingredients.editIngredientScreen.title',
    Component: EditIngredientScreen,
  },
] as IngredientsScreen[];
