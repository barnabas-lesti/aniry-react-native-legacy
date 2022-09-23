import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, ScrollView, View } from 'react-native';

interface AppScrollViewProps {
  /**
   * Is scroll view disabled.
   */
  isDisabled?: boolean;

  /**
   * Elements to be contained in the dialog popup.
   */
  children: JSX.Element | Array<JSX.Element>;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;
}

export function AppScrollView({ isDisabled, children, style }: AppScrollViewProps) {
  return (
    <>
      {isDisabled ? (
        <View style={[styles.container, style]}>{children}</View>
      ) : (
        <ScrollView style={[styles.container, style]}>{children}</ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
