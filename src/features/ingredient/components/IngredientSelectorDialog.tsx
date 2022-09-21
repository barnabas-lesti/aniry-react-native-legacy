import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppButtonGroup, AppDialog } from 'app/components';
import { appTheme } from 'app/theme';
import { Ingredient } from '../models';
import { IngredientSearchableList } from './IngredientSearchableList';

interface IngredientSelectorDialogProps {
  /**
   * Selected ingredients.
   */
  selectedIngredients: Ingredient[];

  /**
   * Visibility indicator.
   */
  isVisible: boolean;

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
 * Recipe ingredient editor dialog component.
 */
export function IngredientSelectorDialog(props: IngredientSelectorDialogProps) {
  const { selectedIngredients, isVisible, onSave, onDiscard } = props;

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
      isVisible={isVisible}
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

      <IngredientSearchableList
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
