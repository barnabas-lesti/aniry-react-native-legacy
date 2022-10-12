import React from 'react';
import { StyleSheet, View } from 'react-native';

import { appStyles, appTheme } from '../theme';
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
}

export function AppScreen(props: AppScreenProps) {
  const { isScrollable, children } = props;

  return (
    <>
      {isScrollable ? (
        <AppScrollView style={[appStyles.container, appStyles.flex, styles.container]}>{children}</AppScrollView>
      ) : (
        <View style={[appStyles.container, appStyles.flex, styles.container]}>{children}</View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: appTheme.tabBarHeight },
});
