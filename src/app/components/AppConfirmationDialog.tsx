import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { appStyles } from '../theme';
import { AppDialog } from './AppDialog';
import { AppButtonGroup } from './AppButtonGroup';

interface AppConfirmationDialogProps {
  /**
   * Text to display for confirmation.
   */
  text?: string;

  /**
   * Key of the text to display for confirmation.
   */
  textKey?: string;

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
  const { text, textKey, onConfirmation, onCancel } = props;

  const { t } = useTranslation();

  return (
    <AppDialog onDismiss={onCancel}>
      <View style={appStyles.section}>
        <Text style={appStyles.sectionRow}>{text || (textKey && t(textKey))}</Text>
        <AppButtonGroup
          style={appStyles.sectionRow}
          buttons={[
            {
              label: t('app.labels.cancel'),
              type: 'secondary',
              onPress: onCancel,
            },
            {
              label: t('app.labels.ok'),
              onPress: onConfirmation,
            },
          ]}
        />
      </View>
    </AppDialog>
  );
}
