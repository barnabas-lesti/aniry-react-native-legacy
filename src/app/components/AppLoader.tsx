import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { appTheme } from '../theme';

interface AppLoaderProps {
  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Application loader component.
 */
export function AppLoader(props: AppLoaderProps) {
  const { style } = props;

  return (
    <ActivityIndicator
      style={style}
      size="large"
      color={appTheme.colors.primary}
    />
  );
}
