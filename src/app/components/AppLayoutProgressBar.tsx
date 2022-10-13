import React from 'react';
import { ProgressBar } from 'react-native-paper';

import { useAppSelector } from '../store/hooks';
import { appState } from '../state';
import { appTheme } from '../theme';

export function AppLayoutProgressBar() {
  const isAppLoading = appState.selectors.isAppLoading(useAppSelector((state) => state.app));

  return (
    <ProgressBar
      visible={isAppLoading}
      indeterminate
      color={appTheme.colors.primary}
    />
  );
}
