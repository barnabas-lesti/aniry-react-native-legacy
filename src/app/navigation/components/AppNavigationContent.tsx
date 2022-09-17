import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import { appTheme } from '../../theme';
import { AppStackParamList } from '../models';
import { appScreens } from '../appScreens';

const Tab = createBottomTabNavigator<AppStackParamList>();

export function AppNavigationContent() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {appScreens.map(({ name, Component, titleKey, tabBarIcon }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={Component}
            options={{
              title: t(titleKey),
              tabBarIcon,
              tabBarLabel: '',
              tabBarActiveTintColor: appTheme.colors.primary,
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
