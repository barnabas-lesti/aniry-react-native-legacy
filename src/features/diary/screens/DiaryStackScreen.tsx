import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { DiaryScreenOptions, DiaryStackParamList } from '../models';
import { DiaryHomeScreen } from './DiaryHomeScreen';

export const screens = [
  {
    name: 'DiaryHome',
    titleKey: 'diary.diaryHomeScreen.title',
    Component: DiaryHomeScreen,
  },
] as DiaryScreenOptions[];

const Stack = createStackNavigator<DiaryStackParamList>();

export function DiaryStackScreen() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {screens.map(({ name, titleKey, Component }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{ title: t(titleKey) }}
          component={Component}
        />
      ))}
    </Stack.Navigator>
  );
}
