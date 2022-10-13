import { AppStackScreenOptions } from 'app/models';
import { IngredientStackParamList } from '../models';
import { IngredientHomeScreen } from './IngredientHomeScreen';
import { IngredientEditScreen } from './IngredientEditScreen';
import { IngredientCreateScreen } from './IngredientCreateScreen';

export const ingredientScreens: AppStackScreenOptions<IngredientStackParamList>[] = [
  {
    name: 'IngredientHome',
    Component: IngredientHomeScreen,
  },
  {
    name: 'IngredientCreate',
    Component: IngredientCreateScreen,
  },
  {
    name: 'IngredientEdit',
    Component: IngredientEditScreen,
  },
];
