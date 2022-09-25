import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { appCommonService } from '../services';
import { appTheme } from '../theme';

export function AppProgressBar() {
  const [isVisible, setIsVisible] = useState(false);

  appCommonService.onLoadingStateChange(setIsVisible);

  return (
    <ProgressBar
      visible={isVisible}
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
