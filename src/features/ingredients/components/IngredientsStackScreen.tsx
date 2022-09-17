import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { IngredientsStackParamList } from '../models';
import { ingredientsScreens } from '../ingredientsScreens';

const Stack = createStackNavigator<IngredientsStackParamList>();

export function IngredientsStackScreen() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {ingredientsScreens.map(({ name, titleKey, Component }) => (
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
