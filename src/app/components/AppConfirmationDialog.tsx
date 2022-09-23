import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

interface AppConfirmationDialogProps {
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
 * Application confirmation dialog component.
 */
export function AppConfirmationDialog(props: AppConfirmationDialogProps) {
  const { text, onConfirmation, onCancel } = props;

  const { t } = useTranslation();

  return (
    <Portal>
      <Dialog
        visible
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
