import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';

interface AppModalProps {
  /**
   * Visibility indicator.
   */
  isVisible: boolean;

  /**
   * Elements to be contained in the modal popup.
   */
  children: JSX.Element | Array<JSX.Element>;

  /**
   * OnDismiss event handler.
   */
  onDismiss: () => void;
}

/**
 * Application modal component.
 */
export function AppModal(props: AppModalProps) {
  const { isVisible, onDismiss } = props;

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={onDismiss}
      >
        <View style={styles.content}>{props.children}</View>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 14,
  },
});
