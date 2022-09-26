import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppButtonGroup, AppDialog } from 'app/components';
import { appTheme } from 'app/theme';
import { AppServing } from 'app/models';

interface IngredientServingEditorDialogProps {
  serving: AppServing;

  /**
   * Confirmation event handler.
   */
  onSave: (serving: AppServing) => void;

  /**
   * Cancellation event handler.
   */
  onDiscard: () => void;
}

/**
 * Ingredient serving editor dialog component.
 */
export function IngredientServingEditorDialog(props: IngredientServingEditorDialogProps) {
  const { serving, onSave, onDiscard } = props;

  const { t } = useTranslation();

  return (
    <AppDialog onDismiss={onDiscard}>
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
            onPress: () => onSave(serving),
          },
        ]}
      />
    </AppDialog>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    marginBottom: appTheme.gaps.medium,
  },
});
