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
   * Confirmation event handler.
   */
  onSave: (ingredientProxy: IngredientProxy) => void;

  /**
   * Cancellation event handler.
   */
  onDiscard: () => void;

  /**
   * On delete event handler.
   */
  onDelete: (ingredientProxy: IngredientProxy) => void;
}

/**
 * Ingredient proxy editor dialog.
 */
export function IngredientProxyEditorDialog(props: IngredientProxyEditorDialogProps) {
  const { ingredientProxy, onSave, onDiscard, onDelete } = props;

  const { t } = useTranslation();
  const [servingValue, setServingValue] = useState(ingredientProxy?.serving.value || 0);

  function onBeforeSave() {
    ingredientProxy && onSave(new IngredientProxy({ ...ingredientProxy, servingValue }));
  }

  function onBeforeDelete() {
    ingredientProxy && onDelete(ingredientProxy);
  }

  return (
    <AppDialog onDismiss={onDiscard}>
      <AppButtonGroup
        style={styles.buttonGroup}
        buttons={[
          {
            label: t('app.labels.discard'),
            type: 'secondary',
            textColor: appTheme.colors.ingredientPrimary,
            compact: true,
            onPress: onDiscard,
          },
          {
            label: t('app.labels.save'),
            backgroundColor: appTheme.colors.ingredientPrimary,
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

      <AppNumberInput
        label={t('app.labels.serving')}
        postfix={t(`app.units.${ingredientProxy?.ingredient.serving.unit}`)}
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
