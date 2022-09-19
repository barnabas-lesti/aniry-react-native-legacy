import React, { useEffect, useState } from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppTextInput, AppNumberInput, AppSelectInput, AppButton, AppConfirmationModal } from 'app/components';
import { appTheme } from 'app/theme';
import { Ingredient, ingredientServingUnits } from '../models';
import { ingredientService } from '../services';

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
  onAfterSave: (ingredient: Ingredient) => void;

  /**
   * On delete event handler.
   */
  onAfterDelete?: (ingredient: Ingredient) => void;
}

/**
 * Ingredient editor component.
 */
export function IngredientEditor(props: IngredientEditorProps) {
  const { ingredient = new Ingredient(), style, onDiscard, onAfterSave, onAfterDelete } = props;
  const { serving, nutrients } = ingredient;

  const isNewIngredient = !ingredient.id;

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
      onAfterSave(await saveIngredient());
    }
  }

  function onDeleteButtonPress() {
    if (!isSaveInProgress && !isDeleteInProgress) {
      setIsDeleteConfirmationVisible(true);
    }
  }

  async function onDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);
    await deleteIngredient();
    onAfterDelete && onAfterDelete(ingredient);
  }

  async function saveIngredient() {
    setIsSaveInProgress(true);
    const ingredientToSave = new Ingredient({
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
    });

    let savedIngredient: Ingredient;
    if (isNewIngredient) {
      savedIngredient = await ingredientService.createIngredient(ingredientToSave);
    } else {
      savedIngredient = await ingredientService.updateIngredient(ingredientToSave);
    }
    setIsSaveInProgress(false);

    return savedIngredient;
  }

  async function deleteIngredient() {
    setIsDeleteInProgress(true);
    await ingredientService.deleteIngredient(ingredient);
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
      <View style={styles.inputs}>
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
          value={fat}
          onChangeValue={setFat}
        />
      </View>

      <AppButton
        style={styles.row}
        isLoading={isSaveInProgress}
        backgroundColor={appTheme.colors.ingredientPrimary}
        label={t(`app.labels.${isNewIngredient ? 'create' : 'update'}`)}
        onPress={onSaveButtonPress}
      />

      <AppButton
        type="secondary"
        textColor={appTheme.colors.ingredientPrimary}
        style={styles.row}
        label={t('app.labels.discard')}
        onPress={onDiscard}
      />

      {!isNewIngredient && (
        <AppButton
          type="danger"
          isLoading={isDeleteInProgress}
          label={t('app.labels.delete')}
          onPress={onDeleteButtonPress}
        />
      )}

      {!isNewIngredient && (
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
    marginBottom: appTheme.gaps.small,
  },
  inputs: {
    marginBottom: appTheme.gaps.medium,
  },
  servingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  servingValue: {
    marginRight: appTheme.gaps.small,
    flexGrow: 1,
  },
  servingUnit: {
    minWidth: 70,
  },
});
