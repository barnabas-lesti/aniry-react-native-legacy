import React from 'react';
import { Text } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { AppScreen } from 'app/components';
import { DiaryStackParamList } from '../models';

type DiaryHomeScreenProps = AppStackScreenProps<DiaryStackParamList, 'DiaryHome'>;

export function DiaryHomeScreen(props: DiaryHomeScreenProps) {
  const {} = props;

  return (
    <AppScreen>
      <Text>DiaryHomeScreen</Text>
    </AppScreen>
  );
}
