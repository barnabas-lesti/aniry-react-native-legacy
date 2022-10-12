import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { appState } from '../state';
import { AppStackParamList } from '../models';
import { appScreens } from './appScreens';
import { AppNavbarBottom, AppNavbarTop, AppNotifications } from '../components';
import { appScreenGroups } from './appScreenGroups';

const Stack = createStackNavigator<AppStackParamList>();

export function AppStackScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const activeScreenName = useAppSelector(({ app }) => app.activeScreenName);
  const [activeTitleKey, setActiveTitleKey] = useState('');

  useEffect(() => {
    setActiveTitleKey(appScreens.filter((screen) => screen.name === activeScreenName)[0]?.titleKey || '');
  }, [activeScreenName]);

  return (
    <NavigationContainer>
      <AppNavbarTop title={t(activeTitleKey)} />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        screenListeners={({ route }) => ({
          state: () => {
            dispatch(appState.actions.setActiveScreenName(route.name));
          },
        })}
      >
        {appScreens.map(({ name, titleKey, Component }) => (
          <Stack.Screen
            key={name}
            name={name}
            options={{ title: t(titleKey) }}
            component={Component}
          />
        ))}
      </Stack.Navigator>
      <AppNavbarBottom
        groups={appScreenGroups}
        activeScreenName={activeScreenName}
      />
      <AppNotifications />
    </NavigationContainer>
  );
}
