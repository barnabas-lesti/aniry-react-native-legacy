import React from 'react';
import { View } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { AppScreen } from 'app/components';
import { DiaryStackParamList } from '../models';
import { appStyles } from 'app/theme';
import { DiaryMealEditor } from '../components';

type DiaryHomeScreenProps = AppStackScreenProps<DiaryStackParamList, 'DiaryHome'>;

export function DiaryHomeScreen(props: DiaryHomeScreenProps) {
  const {} = props;

  return (
    <AppScreen titleKey="diary.diaryHomeScreen.title">
      <View style={appStyles.flex}>
        <DiaryMealEditor />
      </View>
    </AppScreen>
  );
}
