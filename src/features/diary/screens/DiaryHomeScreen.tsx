import React from 'react';
import { View } from 'react-native';

import { AppStackScreenProps, AppStackParamList } from 'app/models';
import { AppScreen } from 'app/components';
import { appStyles } from 'app/theme';
import { DiaryMealEditor } from '../components';

type DiaryHomeScreenProps = AppStackScreenProps<AppStackParamList, 'DiaryHome'>;

export function DiaryHomeScreen(props: DiaryHomeScreenProps) {
  const {} = props;

  return (
    <AppScreen>
      <View style={appStyles.flex}>
        <DiaryMealEditor />
      </View>
    </AppScreen>
  );
}
