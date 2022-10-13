import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AppStackScreenOptions } from '../models';

interface AppStackScreenProps<T extends ParamListBase> {
  screens: AppStackScreenOptions<T>[];
}

export function AppStackScreen<T extends ParamListBase>(props: AppStackScreenProps<T>) {
  const { screens } = props;
  const Stack = createStackNavigator<T>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screens.map(({ name, Component }) => (
        <Stack.Screen
          key={name as string}
          name={name}
          component={Component}
        />
      ))}
    </Stack.Navigator>
  );
}
