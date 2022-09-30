import React, { useState } from 'react';
import { StyleSheet, StyleProp, ViewStyle, View, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface AppScrollViewProps {
  /**
   * Is scroll view disabled.
   */
  isDisabled?: boolean;

  /**
   * Elements to be contained in the dialog popup.
   */
  children: React.ReactNode;

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
        <KeyboardAwareScrollView
          extraScrollHeight={-80}
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
        </KeyboardAwareScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
