import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { diaryScreens } from 'features/diary/screens';
import { ingredientScreens } from 'features/ingredient/screens';
import { recipeScreens } from 'features/recipe/screens';
import { appTheme } from '../theme';
import { AppTabParamList, AppTabScreenOptions } from '../models';
import { AppIcon } from '../components';
import { AppStackScreen } from './AppStackScreen';

const tabs: AppTabScreenOptions[] = [
  {
    name: 'Diary',
    color: appTheme.colors.diaryPrimary,
    icon: appTheme.icons.diary,
    Component: () => <AppStackScreen screens={diaryScreens} />,
  },
  {
    name: 'Ingredient',
    color: appTheme.colors.ingredientPrimary,
    icon: appTheme.icons.ingredient,
    Component: () => <AppStackScreen screens={ingredientScreens} />,
  },
  {
    name: 'Recipe',
    color: appTheme.colors.recipePrimary,
    icon: appTheme.icons.recipe,
    Component: () => <AppStackScreen screens={recipeScreens} />,
  },

  // {
  //   name: 'Settings',
  //   titleKey: 'app.appSettingsScreen.title',
  //   activeColor: appTheme.colors.settingsPrimary,
  //   Component: AppSettingsScreen,
  //   tabBarIcon: tabBarIconFactory(appTheme.icons.settings),
  // },
];

const tabBarIconFactory =
  (icon: string) =>
  ({ color, size }: { focused: boolean; color: string; size: number }) =>
    (
      <AppIcon
        icon={icon}
        color={color}
        size={size}
      />
    );

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppTabScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {tabs.map(({ name, color, icon, Component }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={Component}
            options={{
              tabBarIcon: tabBarIconFactory(icon),
              tabBarActiveTintColor: color || appTheme.colors.primary,
              headerShown: false,
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
