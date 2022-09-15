import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

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

export function AppModal(props: AppModalProps) {
  const { isVisible, onDismiss } = props;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onDismiss}
    >
      <View style={styles.content}>{props.children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: 14,
  },
});
