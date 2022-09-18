import React, { useEffect, useState } from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppTextInput, AppNumberInput, AppSelectInput, AppButton, AppConfirmationModal } from 'app/components';
import { Ingredient, ingredientServingUnits } from '../models';

interface IngredientEditorProps {
  /**
   * The ingredient object.
   */
  ingredient?: Ingredient;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * On discard event handler.
   */
  onDiscard: () => void;

  /**
   * On save event handler.
   */
  onSave: (ingredient: Ingredient) => Promise<void>;

  /**
   * On delete event handler.
   */
  onDelete?: (ingredient: Ingredient) => Promise<void>;
}

/**
 * Ingredient editor component.
 * @example
 * <IngredientEditor ingredient={ingredient} onSaveIngredient={onSaveIngredient} />
 */
export function IngredientEditor(props: IngredientEditorProps) {
  const { ingredient = new Ingredient(), style, onDiscard, onSave, onDelete } = props;
  const { serving, nutrients } = ingredient;
  const canDelete = ingredient.id && onDelete;

  const { t } = useTranslation();

  const [name, setName] = useState(ingredient.name);
  const [servingValue, setServingValue] = useState(serving.value);
  const [servingUnit, setServingUnit] = useState(serving.unit);
  const [calories, setCalories] = useState(nutrients.calories);
  const [carbs, setCarbs] = useState(nutrients.carbs);
  const [protein, setProtein] = useState(nutrients.protein);
  const [fat, setFat] = useState(nutrients.fat);

  const [canValidate, setCanValidate] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(validateName(name));
  const [servingValueIsValid, setServingValueIsValid] = useState(validateServingValue(serving.value));
  const [servingUnitIsValid, setServingUnitIsValid] = useState(validateServingUnit(serving.unit));

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [isSaveInProgress, setIsSaveInProgress] = useState(false);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);

  const servingUnitOptions = Object.keys(ingredientServingUnits).map((unit) => ({
    value: unit,
    label: t(ingredientServingUnits[unit as keyof typeof ingredientServingUnits]),
  }));

  useEffect(() => {
    setNameIsValid(validateName(name));
  }, [name]);

  useEffect(() => {
    setServingValueIsValid(validateServingValue(servingValue));
  }, [servingValue]);

  useEffect(() => {
    setServingUnitIsValid(validateServingUnit(servingUnit));
  }, [servingUnit]);

  async function onSaveButtonPress() {
    if (validateForm() && !isSaveInProgress && !isDeleteInProgress) {
      setIsSaveInProgress(true);
      await onSave(
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
      setIsSaveInProgress(false);
    }
  }

  function onDeleteButtonPress() {
    if (!isSaveInProgress && !isDeleteInProgress) {
      setIsDeleteConfirmationVisible(true);
    }
  }

  async function onDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);
    setIsDeleteInProgress(true);
    onDelete && (await onDelete(ingredient));
    setIsDeleteInProgress(false);
  }

  function validateForm() {
    !canValidate && setCanValidate(true);
    return nameIsValid && servingValueIsValid && servingUnitIsValid;
  }

  function validateName(value: string) {
    return !!value;
  }

  function validateServingValue(value: number) {
    return value > 0;
  }

  function validateServingUnit(value: keyof typeof ingredientServingUnits) {
    return !!ingredientServingUnits[value];
  }

  return (
    <View style={style}>
      <AppTextInput
        label={t('app.labels.name')}
        style={styles.row}
        value={name}
        isInvalid={canValidate && !nameIsValid}
        onChangeValue={setName}
      />

      <View style={[styles.row, styles.servingContainer]}>
        <AppNumberInput
          style={styles.servingValue}
          label={t('app.labels.serving')}
          value={servingValue}
          isInvalid={canValidate && !servingValueIsValid}
          onChangeValue={setServingValue}
        />
        <AppSelectInput
          style={styles.servingUnit}
          options={servingUnitOptions}
          value={servingUnit}
          isInvalid={canValidate && !servingUnitIsValid}
          onChangeValue={setServingUnit}
        />
      </View>

      <AppNumberInput
        label={t('app.labels.calories')}
        postfix={t('app.units.kcal')}
        style={styles.row}
        value={calories}
        onChangeValue={setCalories}
      />

      <AppNumberInput
        label={t('app.labels.carbs')}
        postfix={t('app.units.g')}
        style={styles.row}
        value={carbs}
        onChangeValue={setCarbs}
      />

      <AppNumberInput
        label={t('app.labels.protein')}
        postfix={t('app.units.g')}
        style={styles.row}
        value={protein}
        onChangeValue={setProtein}
      />

      <AppNumberInput
        label={t('app.labels.fat')}
        postfix={t('app.units.g')}
        style={styles.row}
        value={fat}
        onChangeValue={setFat}
      />

      <AppButton
        style={styles.button}
        isLoading={isSaveInProgress}
        label={t('app.labels.save')}
        onPress={onSaveButtonPress}
      />

      <AppButton
        type="secondary"
        style={styles.button}
        label={t('app.labels.discard')}
        onPress={onDiscard}
      />

      {canDelete && (
        <AppButton
          type="danger"
          style={styles.button}
          isLoading={isDeleteInProgress}
          label={t('app.labels.delete')}
          onPress={onDeleteButtonPress}
        />
      )}

      {canDelete && (
        <AppConfirmationModal
          isVisible={isDeleteConfirmationVisible}
          text={t('ingredient.ingredientEditor.deleteConfirmation')}
          onConfirmation={onDeleteConfirmation}
          onCancel={() => setIsDeleteConfirmationVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  button: {
    marginTop: 15,
  },
  servingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  servingValue: {
    marginRight: 10,
    flexGrow: 1,
  },
  servingUnit: {
    minWidth: 70,
  },
});
