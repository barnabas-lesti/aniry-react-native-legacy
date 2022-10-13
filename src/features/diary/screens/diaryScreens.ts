import { AppStackScreenOptions } from 'app/models';
import { DiaryStackParamList } from '../models';
import { DiaryHomeScreen } from './DiaryHomeScreen';

export const diaryScreens: AppStackScreenOptions<DiaryStackParamList>[] = [
  {
    name: 'DiaryHome',
    Component: DiaryHomeScreen,
  },
];
