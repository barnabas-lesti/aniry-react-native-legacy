import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppButtonGroup, AppDialog, AppNumberInput } from 'app/components';
import { appTheme } from 'app/theme';
import { IngredientProxy } from '../models';

interface IngredientProxyEditorDialogProps {
  /**
   * Ingredient proxy to edit.
   */
  ingredientProxy: IngredientProxy | null;

  /**
   * Visibility indicator.
   */
  isVisible: boolean;

  /**
   * Confirmation event handler.
   */
  onSave: (ingredientProxy: IngredientProxy) => void;

  /**
   * Cancellation event handler.
   */
  onDiscard: () => void;
}

/**
 * Ingredient proxy editor dialog.
 */
export function IngredientProxyEditorDialog(props: IngredientProxyEditorDialogProps) {
  const { ingredientProxy, isVisible, onSave, onDiscard } = props;

  const { t } = useTranslation();
  const [servingValue, setServingValue] = useState(ingredientProxy?.serving.value || 0);

  function onBeforeSave() {
    ingredientProxy && onSave(new IngredientProxy({ ...ingredientProxy, serving: { value: servingValue } }));
  }

  return (
    <AppDialog
      isVisible={isVisible}
      onDismiss={onDiscard}
    >
      <AppButtonGroup
        style={styles.buttonGroup}
        buttons={[
          {
            label: t('app.labels.discard'),
            type: 'secondary',
            textColor: appTheme.colors.ingredientPrimary,
            onPress: onDiscard,
          },
          {
            label: t('app.labels.save'),
            backgroundColor: appTheme.colors.ingredientPrimary,
            onPress: onBeforeSave,
          },
        ]}
      />

      <AppNumberInput
        label={t('app.labels.serving')}
        postfix={t(`app.units.${ingredientProxy?.serving.unit}`)}
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
});
