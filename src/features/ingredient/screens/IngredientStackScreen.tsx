import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { IngredientStackParamList, IngredientScreen } from '../models';

import { IngredientHomeScreen } from './IngredientHomeScreen';
import { IngredientEditScreen } from './IngredientEditScreen';

export const screens = [
  {
    name: 'IngredientHome',
    titleKey: 'ingredient.ingredientHomeScreen.title',
    Component: IngredientHomeScreen,
  },
  {
    name: 'IngredientCreate',
    titleKey: 'ingredient.ingredientCreateScreen.title',
    Component: IngredientEditScreen,
  },
  {
    name: 'IngredientEdit',
    titleKey: 'ingredient.ingredientEditScreen.title',
    Component: IngredientEditScreen,
  },
] as IngredientScreen[];

const Stack = createStackNavigator<IngredientStackParamList>();

export function IngredientStackScreen() {
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
