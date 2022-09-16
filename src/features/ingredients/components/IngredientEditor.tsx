import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppTextInput, AppNumberInput, AppServingInput, AppButton, AppConfirmationModal } from 'app/components';
import { Ingredient, servingUnits } from '../models';

interface IngredientEditorProps {
  /**
   * The ingredient object.
   */
  ingredient: Ingredient;

  /**
   * On save event handler.
   */
  onSaveIngredient: (ingredient: Ingredient) => void;

  /**
   * On discard event handler.
   */
  onDiscardIngredient: () => void;

  /**
   * On delete event handler.
   */
  onDeleteIngredient?: (ingredient: Ingredient) => void;
}

/**
 * Ingredient editor component.
 * @example
 * <IngredientEditor ingredient={ingredient} onSaveIngredient={onSaveIngredient} />
 */
export function IngredientEditor(props: IngredientEditorProps) {
  const { ingredient, onSaveIngredient, onDiscardIngredient, onDeleteIngredient } = props;
  const { serving, nutrients } = ingredient;

  const { t } = useTranslation();
  const [name, setName] = useState(ingredient.name);
  const [servingValue, setServingValue] = useState(serving.value);
  const [servingUnit, setServingUnit] = useState(serving.unit);
  const [calories, setCalories] = useState(nutrients.calories);
  const [carbs, setCarbs] = useState(nutrients.carbs);
  const [protein, setProtein] = useState(nutrients.protein);
  const [fat, setFat] = useState(nutrients.fat);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

  const servingUnitOptions = Object.keys(servingUnits).map((unit) => ({
    value: unit,
    label: t(servingUnits[unit as keyof typeof servingUnits]),
  }));

  function onSaveButtonPress() {
    onSaveIngredient(
      new Ingredient({
        id: ingredient.id,
        name,
        serving: {
          value: servingValue,
          unit: servingUnit,
        },
        nutrients: {
          calories,
          carbs,
          protein,
          fat,
        },
      })
    );
  }

  function onDeleteButtonPress() {
    setIsDeleteConfirmationVisible(true);
  }

  function onDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);
    onDeleteIngredient && onDeleteIngredient(ingredient);
  }

  return (
    <View style={styles.container}>
      <AppTextInput
        label={t('app.labels.name')}
        style={styles.inputs}
        value={name}
        onChangeValue={setName}
      />

      <AppServingInput
        style={styles.inputs}
        label={t('app.labels.serving')}
        servingValue={servingValue}
        unitValue={servingUnit}
        options={servingUnitOptions}
        onChangeServingValue={setServingValue}
        onChangeUnitValue={setServingUnit}
      />

      <AppNumberInput
        label={t('app.labels.calories')}
        postfix={t('app.units.kcal')}
        style={styles.inputs}
        value={calories}
        onChangeValue={setCalories}
      />

      <AppNumberInput
        label={t('app.labels.carbs')}
        postfix={t('app.units.g')}
        style={styles.inputs}
        value={carbs}
        onChangeValue={setCarbs}
      />

      <AppNumberInput
        label={t('app.labels.protein')}
        postfix={t('app.units.g')}
        style={styles.inputs}
        value={protein}
        onChangeValue={setProtein}
      />

      <AppNumberInput
        label={t('app.labels.fat')}
        postfix={t('app.units.g')}
        style={styles.inputs}
        value={fat}
        onChangeValue={setFat}
      />

      <AppButton
        style={styles.buttons}
        label={t('app.labels.save')}
        onPress={onSaveButtonPress}
      />

      <AppButton
        type="secondary"
        style={styles.buttons}
        label={t('app.labels.discard')}
        onPress={onDiscardIngredient}
      />

      {onDeleteIngredient && (
        <AppButton
          style={styles.buttons}
          type="danger"
          label={t('app.labels.delete')}
          onPress={onDeleteButtonPress}
        />
      )}

      {onDeleteIngredient && (
        <AppConfirmationModal
          isVisible={isDeleteConfirmationVisible}
          text={t('ingredients.ingredientEditor.deleteConfirmation')}
          onConfirmation={onDeleteConfirmation}
          onDiscard={() => setIsDeleteConfirmationVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputs: {
    marginBottom: 8,
  },
  buttons: {
    marginTop: 16,
  },
});
