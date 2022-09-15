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
   * Discard event handler.
   */
  onDiscard: () => void;
}

export function AppConfirmationModal(props: AppConfirmationModalProps) {
  const { isVisible, text, onConfirmation, onDiscard } = props;

  const { t } = useTranslation();

  return (
    <AppModal
      isVisible={isVisible}
      onDismiss={onDiscard}
    >
      <Text style={styles.text}>{text}</Text>
      <AppButton
        style={styles.button}
        type="primary"
        label={t('app.labels.confirm')}
        onPress={onConfirmation}
      />
      <AppButton
        label={t('app.labels.discard')}
        onPress={onDiscard}
      />
    </AppModal>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 14,
  },
  button: {
    marginBottom: 14,
  },
});
