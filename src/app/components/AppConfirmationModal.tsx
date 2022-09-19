import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

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
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={onCancel}
      >
        <Dialog.Content>
          <Paragraph>{text}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>{t('app.labels.cancel')}</Button>
          <Button onPress={onConfirmation}>{t('app.labels.ok')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
