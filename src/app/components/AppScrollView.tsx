import React, { useState } from 'react';
import { StyleSheet, StyleProp, ViewStyle, ScrollView, View, RefreshControl } from 'react-native';

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

  /**
   * On refresh event handler.
   */
  onRefresh?: () => Promise<void>;
}

export function AppScrollView(props: AppScrollViewProps) {
  const { isDisabled, children, style, onRefresh } = props;

  const [isRefreshing, setIsRefreshing] = useState(false);

  async function onLocalRefresh() {
    if (onRefresh) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
  }

  return (
    <>
      {isDisabled ? (
        <View style={[styles.container, style]}>{children}</View>
      ) : (
        <ScrollView
          style={[styles.container, style]}
          refreshControl={
            onRefresh && (
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onLocalRefresh}
              />
            )
          }
        >
          {children}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
