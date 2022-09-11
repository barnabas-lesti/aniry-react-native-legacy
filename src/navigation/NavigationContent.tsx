import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppTranslation } from '../i18n/hooks';
import type { RootStackParamList } from './types';
import { screens } from './screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Configures and renders the application screens.
 * @returns Screen rendering setup.
 */
export function NavigationContent() {
  const { t } = useAppTranslation();

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
