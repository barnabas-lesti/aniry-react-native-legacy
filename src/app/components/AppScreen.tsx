import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';

import { appTheme } from '../theme';
import { AppProgressBar } from './AppProgressBar';
import { AppScrollView } from './AppScrollView';

interface AppScreenProps {
  /**
   * Use scroll view or simple view flag.
   */
  isScrollable?: boolean;

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
  const { isScrollable, children, style } = props;

  return (
    <>
      <AppProgressBar />
      {isScrollable ? (
        <AppScrollView style={[styles.content, style]}>{children}</AppScrollView>
      ) : (
        <View style={[styles.content, style]}>{children}</View>
      )}
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
