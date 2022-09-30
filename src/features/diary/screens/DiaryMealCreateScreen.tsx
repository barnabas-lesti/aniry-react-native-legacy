import React from 'react';

import { AppStackScreenProps } from 'app/models';
import { AppScreen } from 'app/components';
import { DiaryStackParamList } from '../models';
import { DiaryMealEditor } from '../components';

type DiaryMealCreateScreenProps = AppStackScreenProps<DiaryStackParamList, 'DiaryMealCreate'>;

export function DiaryMealCreateScreen(props: DiaryMealCreateScreenProps) {
  const { navigation } = props;

  return (
    <AppScreen>
      <DiaryMealEditor
        onDiscard={() => navigation.goBack()}
        onAfterSave={() => navigation.push('DiaryHome')}
      />
    </AppScreen>
  );
}
