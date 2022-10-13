import { AppStackScreenOptions } from 'app/models';
import { RecipeStackParamList } from '../models';
import { RecipeHomeScreen } from './RecipeHomeScreen';
import { RecipeCreateScreen } from './RecipeCreateScreen';
import { RecipeEditScreen } from './RecipeEditScreen';

export const recipeScreens: AppStackScreenOptions<RecipeStackParamList>[] = [
  {
    name: 'RecipeHome',
    Component: RecipeHomeScreen,
  },
  {
    name: 'RecipeCreate',
    Component: RecipeCreateScreen,
  },
  {
    name: 'RecipeEdit',
    Component: RecipeEditScreen,
  },
];
