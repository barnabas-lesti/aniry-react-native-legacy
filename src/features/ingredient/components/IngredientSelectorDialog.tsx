import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppButtonGroup, AppDialog } from 'app/components';
import { appTheme } from 'app/theme';
import { Ingredient } from '../models';
import { IngredientList } from './IngredientList';

interface IngredientSelectorDialogProps {
  /**
   * Selected ingredients.
   */
  selectedIngredients: Ingredient[];

  /**
   * Confirmation event handler.
   */
  onSave: (ingredients: Ingredient[]) => void;

  /**
   * Cancellation event handler.
   */
  onDiscard: () => void;
}

/**
 * Ingredient selector dialog component.
 */
export function IngredientSelectorDialog(props: IngredientSelectorDialogProps) {
  const { selectedIngredients, onSave, onDiscard } = props;

  const { t } = useTranslation();
  const [localSelectedIngredients, setLocalSelectedIngredients] = useState(selectedIngredients);

  function onSelectIngredient(ingredient: Ingredient) {
    if (isIngredientInSelectedIngredients(ingredient)) {
      removeIngredientFromSelectedIngredients(ingredient);
    } else {
      addIngredientToSelectedIngredients(ingredient);
    }
  }

  function isIngredientInSelectedIngredients(ingredient: Ingredient) {
    return localSelectedIngredients.filter(({ id }) => id === ingredient.id).length > 0;
  }

  function addIngredientToSelectedIngredients(ingredient: Ingredient) {
    setLocalSelectedIngredients([...localSelectedIngredients, ingredient]);
  }

  function removeIngredientFromSelectedIngredients(ingredient: Ingredient) {
    setLocalSelectedIngredients([...localSelectedIngredients.filter(({ id }) => ingredient.id !== id)]);
  }

  return (
    <AppDialog
      onDismiss={onDiscard}
      contentStyle={styles.dialogContent}
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
            onPress: () => onSave(localSelectedIngredients),
          },
        ]}
      />

      <IngredientList
        selectedIngredients={localSelectedIngredients}
        onSelectIngredient={onSelectIngredient}
      />
    </AppDialog>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    marginBottom: appTheme.gaps.medium,
  },
  dialogContent: {
    height: '95%',
  },
});
