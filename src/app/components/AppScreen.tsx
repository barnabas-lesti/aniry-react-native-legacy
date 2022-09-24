import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';

import { appTheme } from '../theme';
import { AppProgressBar } from './AppProgressBar';

interface AppScreenProps {
  /**
   * Elements to be contained in the dialog popup.
   */
  children: JSX.Element | Array<JSX.Element | boolean>;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;
}

export function AppScreen(props: AppScreenProps) {
  const { children, style } = props;

  return (
    <>
      <AppProgressBar />
      <View style={[styles.content, style]}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: appTheme.gaps.medium,
    paddingBottom: 0,
    flex: 1,
  },
});
