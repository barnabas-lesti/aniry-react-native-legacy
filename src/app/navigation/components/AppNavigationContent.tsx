import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { screens } from '../screens';
import { AppStackParamList } from '../models';

/**
 * App navigation content.
 */
export function AppNavigationContent() {
  const { t } = useTranslation();

  const Stack = createNativeStackNavigator<AppStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.Component}
            options={{ title: t(screen.titleKey) }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
