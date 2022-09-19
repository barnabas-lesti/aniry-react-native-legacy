import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { RecipeStackParamList, RecipeScreenOptions } from '../models';
import { RecipeHomeScreen } from './RecipeHomeScreen';
import { RecipeCreateScreen } from './RecipeCreateScreen';
import { RecipeEditScreen } from './RecipeEditScreen';

export const screens = [
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
] as RecipeScreenOptions[];

const Stack = createStackNavigator<RecipeStackParamList>();

export function RecipeStackScreen() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {screens.map(({ name, titleKey, Component }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{ title: t(titleKey) }}
          component={Component}
        />
      ))}
    </Stack.Navigator>
  );
}
