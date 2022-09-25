import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import { IngredientStackScreen } from 'features/ingredient';
import { RecipeStackScreen } from 'features/recipe';
import { appTheme } from '../theme';
import { AppStackParamList, AppTabBarIconProps, AppScreenOptions } from '../models';
import { AppIcon } from '../components';
import { AppSettingsScreen } from './AppSettingsScreen';

const tabBarIconFactory =
  (icon: string) =>
  ({ color, size }: AppTabBarIconProps) =>
    (
      <AppIcon
        icon={icon}
        color={color}
        size={size}
      />
    );

const screens = [
  {
    name: 'Ingredient',
    titleKey: 'ingredient.ingredientHomeScreen.title',
    activeColor: appTheme.colors.ingredientPrimary,
    headerShown: false,
    Component: IngredientStackScreen,
    tabBarIcon: tabBarIconFactory(appTheme.icons.ingredient),
  },
  {
    name: 'Recipe',
    titleKey: 'recipe.recipeHomeScreen.title',
    activeColor: appTheme.colors.recipePrimary,
    headerShown: false,
    Component: RecipeStackScreen,
    tabBarIcon: tabBarIconFactory(appTheme.icons.recipe),
  },
  {
    name: 'Settings',
    titleKey: 'app.appSettingsScreen.title',
    activeColor: appTheme.colors.settingsPrimary,
    Component: AppSettingsScreen,
    tabBarIcon: tabBarIconFactory(appTheme.icons.settings),
  },
] as AppScreenOptions[];

const Tab = createBottomTabNavigator<AppStackParamList>();

export function AppStackScreen() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {screens.map(({ name, titleKey, headerShown, activeColor, Component, tabBarIcon }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={Component}
            options={{
              title: titleKey && t(titleKey),
              tabBarIcon,
              tabBarActiveTintColor: activeColor || appTheme.colors.primary,
              headerShown,
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
