import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';

interface AppDialogProps {
  /**
   * Visibility indicator.
   */
  isVisible: boolean;

  /**
   * Elements to be contained in the dialog popup.
   */
  children: JSX.Element | Array<JSX.Element>;

  /**
   * Custom styles.
   */
  contentStyle?: StyleProp<ViewStyle>;

  /**
   * OnDismiss event handler.
   */
  onDismiss: () => void;
}

/**
 * Application dialog component.
 */
export function AppDialog(props: AppDialogProps) {
  const { isVisible, contentStyle, children, onDismiss } = props;

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={onDismiss}
      >
        <Dialog.Content style={contentStyle}>{children}</Dialog.Content>
      </Dialog>
    </Portal>
  );
}
