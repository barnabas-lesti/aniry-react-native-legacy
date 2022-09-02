import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { createAppNavigator } from './navigation';
import HomeScreen from './components/home/HomeScreen';
import IngredientsScreen from './components/ingredients/IngredientsScreen';

const Stack = createAppNavigator();

export default function App() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: t('screens.home.title') }}
        />
        <Stack.Screen
          name="Ingredients"
          component={IngredientsScreen}
          options={{ title: t('screens.ingredients.title') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
