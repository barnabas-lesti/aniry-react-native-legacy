import { AppScreenOptions } from '../models';
import { appScreenGroups } from './appScreenGroups';

export const appScreens = [
  ...appScreenGroups.reduce((prev, next) => {
    return prev.concat(next.screens);
  }, [] as AppScreenOptions[]),
];
