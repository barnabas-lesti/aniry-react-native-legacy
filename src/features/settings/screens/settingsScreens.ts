import { AppStackScreenOptions } from 'app/models';
import { SettingsStackParamList } from '../models';
import { SettingsHomeScreen } from './SettingsHomeScreen';

export const settingsScreens: AppStackScreenOptions<SettingsStackParamList>[] = [
  {
    name: 'SettingsHome',
    Component: SettingsHomeScreen,
  },
];
