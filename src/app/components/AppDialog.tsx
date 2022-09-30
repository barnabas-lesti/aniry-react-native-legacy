import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { appStyles, appTheme } from '../theme';

interface AppDialogProps {
  /**
   * Elements to be contained in the dialog popup.
   */
  children: React.ReactNode;

  /**
   * Display a large dialog.
   */
  large?: boolean;

  /**
   * OnDismiss event handler.
   */
  onDismiss: () => void;
}

/**
 * Application dialog component.
 */
export function AppDialog(props: AppDialogProps) {
  const { children, large, onDismiss } = props;

  return (
    <Portal>
      <Modal
        visible
        onDismiss={onDismiss}
        contentContainerStyle={[appStyles.container, styles.container, large && styles.largeContent]}
      >
        {children}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: appTheme.roundness * 4,
    backgroundColor: appTheme.colors.background,
    margin: appTheme.gaps.medium,
  },
  largeContent: {
    height: '93%',
  },
});
