import React from 'react';
import { StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { useAppSelector } from '../store/hooks';
import { appState } from '../state';
import { appTheme } from '../theme';

export function AppProgressBar() {
  const isAppLoading = appState.selectors.isAppLoading(useAppSelector((state) => state.app));

  return (
    <ProgressBar
      visible={isAppLoading}
      style={styles.progressPar}
      indeterminate
      color={appTheme.colors.primary}
    />
  );
}

const styles = StyleSheet.create({
  progressPar: {
    position: 'absolute',
  },
});
