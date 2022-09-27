import React from 'react';
import { StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { useAppSelector } from '../store/hooks';
import { appTheme } from '../theme';

export function AppProgressBar() {
  const { isLoading } = useAppSelector((state) => state.app);

  return (
    <ProgressBar
      visible={isLoading}
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
