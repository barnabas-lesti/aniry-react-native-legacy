import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { appTheme } from '../theme';
import { AppItem, AppItemProxy } from '../models';
import { AppButtonGroup } from './AppButtonGroup';
import { AppDialog } from './AppDialog';
import { AppNumberInput } from './AppNumberInput';

interface AppItemProxyEditorDialogProps<T extends AppItem> {
  /**
   * Item proxy to edit.
   */
  itemProxy: AppItemProxy<T>;

  /**
   * Primary color to use.
   */
  primaryColor: string;

  /**
   * Text to display.
   */
  text: string;

  /**
   * Confirmation event handler.
   */
  onSave: (itemProxy: AppItemProxy<T>) => void;

  /**
   * Cancellation event handler.
   */
  onDiscard: () => void;

  /**
   * On delete event handler.
   */
  onDelete: (itemProxy: AppItemProxy<T>) => void;
}

/**
 * Item proxy editor dialog.
 */
export function AppItemProxyEditorDialog<T extends AppItem>(props: AppItemProxyEditorDialogProps<T>) {
  const { itemProxy, primaryColor, text, onSave, onDiscard, onDelete } = props;

  const { t } = useTranslation();
  const [servingValue, setServingValue] = useState(itemProxy.serving.value || 0);

  function onBeforeSave() {
    onSave(
      new AppItemProxy<T>({ item: itemProxy.item, serving: { unit: itemProxy.serving.unit, value: servingValue } })
    );
  }

  function onBeforeDelete() {
    onDelete(itemProxy);
  }

  return (
    <AppDialog onDismiss={onDiscard}>
      <AppButtonGroup
        style={styles.buttonGroup}
        buttons={[
          {
            label: t('app.labels.discard'),
            type: 'secondary',
            textColor: primaryColor,
            compact: true,
            onPress: onDiscard,
          },
          {
            label: t('app.labels.save'),
            backgroundColor: primaryColor,
            compact: true,
            onPress: onBeforeSave,
          },
          {
            label: t('app.labels.remove'),
            type: 'danger',
            compact: true,
            onPress: onBeforeDelete,
          },
        ]}
      />

      {text && <Text style={styles.text}>{text}</Text>}

      <AppNumberInput
        label={t('app.labels.serving')}
        postfix={t(`app.units.${itemProxy.serving.unit}`)}
        value={servingValue}
        onChangeValue={setServingValue}
      />
    </AppDialog>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    marginBottom: appTheme.gaps.medium,
  },
  text: {
    marginBottom: appTheme.gaps.medium,
  },
});
