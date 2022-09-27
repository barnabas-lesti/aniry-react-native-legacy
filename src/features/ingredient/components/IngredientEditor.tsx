import React, { useEffect, useState } from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  AppTextInput,
  AppNumberInput,
  AppConfirmationDialog,
  AppButtonGroup,
  AppNutrientsPieChart,
  AppScrollView,
  AppServingInput,
} from 'app/components';
import { appTheme } from 'app/theme';
import { appCommonService } from 'app/services';
import { useAppDispatch } from 'app/store/hooks';
import { appStateActions } from 'app/state';
import { Ingredient } from '../models';
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
   * On after save event handler.
   */
  onAfterSave: () => void;

  /**
   * On after delete event handler.
   */
  onAfterDelete?: () => void;
}

/**
 * Ingredient editor component.
 */
export function IngredientEditor(props: IngredientEditorProps) {
  const { ingredient = new Ingredient(), style, onDiscard, onAfterSave, onAfterDelete } = props;
  const { serving, nutrients } = ingredient;
  const isNewIngredient = !ingredient.id;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [name, setName] = useState(ingredient.name);
  const [servingValue, setServingValue] = useState(serving.value);
  const [servingUnit, setServingUnit] = useState(serving.unit);
  const [calories, setCalories] = useState(nutrients.calories);
  const [carbs, setCarbs] = useState(nutrients.carbs);
  const [protein, setProtein] = useState(nutrients.protein);
  const [fat, setFat] = useState(nutrients.fat);

  const [showValidation, setShowValidation] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(Ingredient.validateName(name));
  const [servingValueIsValid, setServingValueIsValid] = useState(Ingredient.validateServingValue(serving.value));

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

  useEffect(() => {
    setNameIsValid(Ingredient.validateName(name));
  }, [name]);

  useEffect(() => {
    setServingValueIsValid(Ingredient.validateServingValue(servingValue));
  }, [servingValue]);

  async function onSaveButtonPress() {
    if (validateForm()) {
      dispatch(appStateActions.startLoading());
      await ingredientService.saveOne(
        new Ingredient({
          id: ingredient.id,
          name,
          servings: [
            {
              value: servingValue,
              unit: servingUnit,
            },
          ],
          nutrients: {
            calories,
            carbs,
            protein,
            fat,
          },
        })
      );
      dispatch(appStateActions.stopLoading());
      appCommonService.pushNotificationKey(`ingredient.notifications.${isNewIngredient ? 'created' : 'updated'}`);
      onAfterSave();
    }
  }

  async function onDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);
    dispatch(appStateActions.startLoading());
    await ingredientService.deleteOne(ingredient);
    dispatch(appStateActions.stopLoading());
    appCommonService.pushNotificationKey('ingredient.notifications.deleted');
    onAfterDelete && onAfterDelete();
  }

  function validateForm() {
    !showValidation && setShowValidation(true);
    return nameIsValid && servingValueIsValid;
  }

  return (
    <View style={[styles.container, style]}>
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
            label: t(`app.labels.${isNewIngredient ? 'create' : 'update'}`),
            backgroundColor: appTheme.colors.ingredientPrimary,
            onPress: onSaveButtonPress,
          },
          {
            label: t('app.labels.delete'),
            type: 'danger',
            isHidden: isNewIngredient,
            onPress: () => setIsDeleteConfirmationVisible(true),
          },
        ]}
      />

      <AppScrollView>
        <View style={styles.form}>
          <AppTextInput
            label={t('app.labels.name')}
            style={styles.inputs}
            value={name}
            isInvalid={showValidation && !nameIsValid}
            onChangeValue={setName}
          />

          <AppServingInput
            style={[styles.inputs]}
            value={servingValue}
            unit={servingUnit}
            unitOptions={Ingredient.PRIMARY_SERVING_UNITS}
            isInvalid={showValidation && !servingValueIsValid}
            onChangeValue={setServingValue}
            onChangeUnit={setServingUnit}
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
        </View>

        <AppNutrientsPieChart
          nutrients={{ calories, carbs, protein, fat }}
          style={styles.chart}
        />
      </AppScrollView>

      {!isNewIngredient && isDeleteConfirmationVisible && (
        <AppConfirmationDialog
          text={t('ingredient.ingredientEditor.deleteConfirmation')}
          onConfirmation={onDeleteConfirmation}
          onCancel={() => setIsDeleteConfirmationVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonGroup: {
    marginBottom: appTheme.gaps.medium,
  },
  form: {
    marginBottom: appTheme.gaps.small,
  },
  inputs: {
    marginBottom: appTheme.gaps.small,
  },
  chart: {
    marginBottom: appTheme.gaps.medium,
  },
});
