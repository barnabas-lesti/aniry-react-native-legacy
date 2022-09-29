import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppButtonGroup, AppDialog, AppItemList } from 'app/components';
import { appTheme } from 'app/theme';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { Ingredient } from '../models';
import { ingredientState } from '../state';

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
  const dispatch = useAppDispatch();
  const ingredientStateData = useAppSelector(({ ingredient }) => ingredient);
  const ingredients = ingredientState.selectors.ingredientSelectorDialogIngredients(ingredientStateData);
  const [localSelectedIngredients, setLocalSelectedIngredients] = useState(selectedIngredients);

  useEffect(() => {
    dispatch(ingredientState.asyncActions.lazyLoadIngredients());
  }, [dispatch]);

  async function onSearch(searchString: string) {
    dispatch(ingredientState.actions.setIngredientSelectorDialogSearchString(searchString));
  }

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

  async function onRefresh() {
    await dispatch(ingredientState.asyncActions.loadIngredients());
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

      <AppItemList
        items={ingredients}
        initialSearchString={ingredientStateData.ingredientSelectorDialogSearchString}
        noItemsTextKey={'ingredient.ingredientSelectorDialog.noIngredients'}
        selectedItems={localSelectedIngredients}
        onSearch={onSearch}
        onSelect={onSelectIngredient}
        onRefresh={onRefresh}
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
