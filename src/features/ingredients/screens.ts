import type { AppScreen } from 'app/models';
import { EditIngredientScreen } from './components/EditIngredientScreen';
import { IngredientsScreen } from './components/IngredientsScreen';

/**
 * Ingredients screen configuration.
 */
export const screens = [
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
