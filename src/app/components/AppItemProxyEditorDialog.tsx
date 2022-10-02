import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { appStyles } from '../theme';
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
  const { serving, nutrients, item } = itemProxy;

  const { t } = useTranslation();
  const [servingValue, setServingValue] = useState(serving.value || 0);
  const [calories, setCalories] = useState(nutrients.calories || 0);

  function onBeforeSave() {
    onSave(new AppItemProxy<T>({ item, serving: { unit: serving.unit, value: servingValue } }));
  }

  function onBeforeDelete() {
    onDelete(itemProxy);
  }

  function onBeforeSetServingValue(newServingValue: number) {
    setServingValue(newServingValue);
    setCalories((nutrients.calories / serving.value) * newServingValue);
  }

  function onBeforeSetCalories(newCalories: number) {
    setCalories(newCalories);
    setServingValue(newCalories / (nutrients.calories / serving.value));
  }

  return (
    <AppDialog onDismiss={onDiscard}>
      <View style={appStyles.section}>
        <AppButtonGroup
          style={appStyles.sectionRow}
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
      </View>

      <View style={appStyles.section}>
        {text && <Text style={appStyles.sectionRow}>{text}</Text>}
        <AppNumberInput
          style={appStyles.sectionRow}
          label={t('app.labels.serving')}
          postfix={t(`app.units.${itemProxy.serving.unit}`)}
          value={servingValue}
          onChangeValue={onBeforeSetServingValue}
        />
      </View>

      <View style={appStyles.section}>
        <Text style={appStyles.sectionRow}>{t('app.appItemProxyEditorDialog.nutrientConverterText')}</Text>
        <AppNumberInput
          style={appStyles.sectionRow}
          label={t('app.labels.calories')}
          postfix={t('app.units.kcal')}
          value={calories}
          onChangeValue={onBeforeSetCalories}
        />
      </View>
    </AppDialog>
  );
}
