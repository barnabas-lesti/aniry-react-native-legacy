import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';

import { AppButton } from './AppButton';
import { AppModal } from './AppModal';

interface AppConfirmationModalProps {
  /**
   * Visibility indicator.
   */
  isVisible: boolean;

  /**
   * Text to display for confirmation.
   */
  text: string;

  /**
   * Confirmation event handler.
   */
  onConfirmation: () => void;

  /**
   * Cancellation event handler.
   */
  onCancel: () => void;
}

/**
 * Application confirmation modal component.
 */
export function AppConfirmationModal(props: AppConfirmationModalProps) {
  const { isVisible, text, onConfirmation, onCancel } = props;

  const { t } = useTranslation();

  return (
    <AppModal
      isVisible={isVisible}
      onDismiss={onCancel}
    >
      <Text style={styles.text}>{text}</Text>
      <AppButton
        style={styles.button}
        label={t('app.labels.confirm')}
        onPress={onConfirmation}
      />
      <AppButton
        type="secondary"
        label={t('app.labels.cancel')}
        onPress={onCancel}
      />
    </AppModal>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 14,
    textAlign: 'center',
  },
  button: {
    marginBottom: 14,
  },
});
