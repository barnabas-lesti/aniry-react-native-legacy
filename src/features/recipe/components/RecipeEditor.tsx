import React, { useEffect, useState } from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppTextInput, AppNumberInput, AppSelectInput, AppButton, AppConfirmationModal } from 'app/components';
import { appTheme } from 'app/theme';
import { Recipe, recipeServingUnits } from '../models';
import { recipeService } from '../services';

interface RecipeEditorProps {
  /**
   * The recipe object.
   */
  recipe?: Recipe;

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
  onAfterSave: (recipe: Recipe) => void;

  /**
   * On delete event handler.
   */
  onAfterDelete?: (recipe: Recipe) => void;
}

/**
 * Recipe editor component.
 */
export function RecipeEditor(props: RecipeEditorProps) {
  const { recipe = new Recipe(), style, onDiscard, onAfterSave, onAfterDelete } = props;
  const { serving } = recipe;

  const isNewRecipe = !recipe.id;

  const { t } = useTranslation();

  const [name, setName] = useState(recipe.name);
  const [servingValue, setServingValue] = useState(serving.value);
  const [servingUnit, setServingUnit] = useState(serving.unit);

  const [canValidate, setCanValidate] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(validateName(name));
  const [servingValueIsValid, setServingValueIsValid] = useState(validateServingValue(serving.value));
  const [servingUnitIsValid, setServingUnitIsValid] = useState(validateServingUnit(serving.unit));

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [isSaveInProgress, setIsSaveInProgress] = useState(false);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);

  const servingUnitOptions = Object.keys(recipeServingUnits).map((unit) => ({
    value: unit,
    label: t(recipeServingUnits[unit as keyof typeof recipeServingUnits]),
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
      onAfterSave(await saveRecipe());
    }
  }

  function onDeleteButtonPress() {
    if (!isSaveInProgress && !isDeleteInProgress) {
      setIsDeleteConfirmationVisible(true);
    }
  }

  async function onDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);
    await deleteRecipe();
    onAfterDelete && onAfterDelete(recipe);
  }

  async function saveRecipe() {
    setIsSaveInProgress(true);
    const recipeToSave = new Recipe({
      id: recipe.id,
      name,
      serving: {
        value: servingValue,
        unit: servingUnit,
      },
    });

    let savedRecipe: Recipe;
    if (isNewRecipe) {
      savedRecipe = await recipeService.createRecipe(recipeToSave);
    } else {
      savedRecipe = await recipeService.updateRecipe(recipeToSave);
    }
    setIsSaveInProgress(false);

    return savedRecipe;
  }

  async function deleteRecipe() {
    setIsDeleteInProgress(true);
    await recipeService.deleteRecipe(recipe);
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

  function validateServingUnit(value: keyof typeof recipeServingUnits) {
    return !!recipeServingUnits[value];
  }

  return (
    <View style={style}>
      <View style={styles.buttons}>
        <AppButton
          type="secondary"
          textColor={appTheme.colors.recipePrimary}
          style={styles.button}
          label={t('app.labels.discard')}
          onPress={onDiscard}
        />

        <AppButton
          style={styles.button}
          isLoading={isSaveInProgress}
          backgroundColor={appTheme.colors.recipePrimary}
          label={t(`app.labels.${isNewRecipe ? 'create' : 'update'}`)}
          onPress={onSaveButtonPress}
        />

        {!isNewRecipe && (
          <AppButton
            type="danger"
            style={styles.button}
            isLoading={isDeleteInProgress}
            label={t('app.labels.delete')}
            onPress={onDeleteButtonPress}
          />
        )}
      </View>

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

      {!isNewRecipe && (
        <AppConfirmationModal
          isVisible={isDeleteConfirmationVisible}
          text={t('recipe.recipeEditor.deleteConfirmation')}
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
  buttons: {
    marginBottom: appTheme.gaps.medium,
    flexDirection: 'row',
    marginHorizontal: appTheme.gaps.small / -2,
  },
  button: {
    flexGrow: 1,
    marginHorizontal: appTheme.gaps.small / 2,
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
