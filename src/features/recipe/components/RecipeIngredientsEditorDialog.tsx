import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { AppButtonGroup, AppDialog } from 'app/components';
import { appTheme } from 'app/theme';
import { Ingredient, IngredientSearchableList } from 'features/ingredient';

interface RecipeIngredientsEditorDialogProps {
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
export function RecipeIngredientsEditorDialog(props: RecipeIngredientsEditorDialogProps) {
  const { selectedIngredients, isVisible, onSave, onDiscard } = props;

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
            labelKey: 'app.labels.discard',
            type: 'secondary',
            textColor: appTheme.colors.ingredientPrimary,
            onPress: onDiscard,
          },
          {
            labelKey: 'app.labels.save',
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
