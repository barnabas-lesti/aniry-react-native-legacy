import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { screens, AppStackParamList } from './navigation';
import { useAppTranslation } from './hooks';
import './i18n';

const Stack = createNativeStackNavigator<AppStackParamList>();

/**
 * Main entrypoint of the application.
 */
export function App() {
  const { t } = useAppTranslation();

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
