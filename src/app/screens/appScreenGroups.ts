import { DiaryHomeScreen } from 'features/diary/screens';
import { IngredientCreateScreen, IngredientEditScreen, IngredientHomeScreen } from 'features/ingredient/screens';
import { RecipeCreateScreen, RecipeEditScreen, RecipeHomeScreen } from 'features/recipe/screens';
import { SettingsScreen } from 'features/settings/screens';
import { appTheme } from '../theme';
import { AppScreenOptionsGroup } from '../models';

export const appScreenGroups: AppScreenOptionsGroup[] = [
  {
    name: 'diary',
    icon: appTheme.icons.diary,
    color: appTheme.colors.primary,
    screens: [
      {
        name: 'DiaryHome',
        titleKey: 'diary.diaryHomeScreen.title',
        Component: DiaryHomeScreen,
      },
    ],
  },

  {
    name: 'ingredient',
    icon: appTheme.icons.ingredient,
    color: appTheme.colors.ingredientPrimary,
    screens: [
      {
        name: 'IngredientHome',
        titleKey: 'ingredient.ingredientHomeScreen.title',
        Component: IngredientHomeScreen,
      },
      {
        name: 'IngredientCreate',
        titleKey: 'ingredient.ingredientCreateScreen.title',
        Component: IngredientCreateScreen,
      },
      {
        name: 'IngredientEdit',
        titleKey: 'ingredient.ingredientEditScreen.title',
        Component: IngredientEditScreen,
      },
    ],
  },

  {
    name: 'recipe',
    icon: appTheme.icons.recipe,
    color: appTheme.colors.recipePrimary,
    screens: [
      {
        name: 'RecipeHome',
        titleKey: 'recipe.recipeHomeScreen.title',
        Component: RecipeHomeScreen,
      },
      {
        name: 'RecipeCreate',
        titleKey: 'recipe.recipeCreateScreen.title',
        Component: RecipeCreateScreen,
      },
      {
        name: 'RecipeEdit',
        titleKey: 'recipe.recipeEditScreen.title',
        Component: RecipeEditScreen,
      },
    ],
  },

  {
    name: 'settings',
    icon: appTheme.icons.settings,
    color: appTheme.colors.primary,
    screens: [
      {
        name: 'Settings',
        titleKey: 'settings.settingsScreen.title',
        Component: SettingsScreen,
      },
    ],
  },
];
