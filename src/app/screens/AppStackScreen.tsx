import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import { HomeScreen } from 'features/home';
import { IngredientStackScreen } from 'features/ingredient';
import { appTheme } from '../theme';
import { AppStackParamList, AppTabBarIconProps, AppScreen } from '../models';
import { AppIcon } from '../components';

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
    name: 'Home',
    titleKey: 'home.homeScreen.title',
    Component: HomeScreen,
    tabBarIcon: tabBarIconFactory('home'),
  },
  {
    name: 'Ingredient',
    headerShown: false,
    Component: IngredientStackScreen,
    tabBarIcon: tabBarIconFactory('food-apple'),
  },
] as AppScreen[];

const Tab = createBottomTabNavigator<AppStackParamList>();

export function AppStackScreen() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {screens.map(({ name, titleKey, headerShown, Component, tabBarIcon }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={Component}
            options={{
              title: titleKey && t(titleKey),
              tabBarIcon,
              tabBarLabel: '',
              tabBarActiveTintColor: appTheme.colors.primary,
              headerShown,
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
