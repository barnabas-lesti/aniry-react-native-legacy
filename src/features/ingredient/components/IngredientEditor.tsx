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
import { Ingredient } from '../models';

interface IngredientEditorProps {
  /**
   * The ingredientInstance instance.
   */
  ingredientInstance?: Ingredient;

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
  onSave: (ingredientInstance: Ingredient) => Promise<void>;

  /**
   * On delete event handler.
   */
  onDelete?: (ingredientInstance: Ingredient) => Promise<void>;
}

/**
 * Ingredient editor component.
 */
export function IngredientEditor(props: IngredientEditorProps) {
  const { ingredientInstance = new Ingredient(), style, onDiscard, onSave, onDelete } = props;
  const { serving, nutrients } = ingredientInstance;
  const isNewIngredient = !ingredientInstance.id;

  const { t } = useTranslation();

  const [name, setName] = useState(ingredientInstance.name);
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
      await onSave(
        new Ingredient({
          id: ingredientInstance.id,
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
    }
  }

  async function onDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);
    onDelete && (await onDelete(ingredientInstance));
  }

  function validateForm() {
    !showValidation && setShowValidation(true);
    return nameIsValid && servingValueIsValid;
  }

  return (
    <View style={[styles.container, style]}>
      <AppButtonGroup
        style={styles.marginBottomMedium}
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
        <View style={styles.marginBottomMedium}>
          <AppTextInput
            label={t('app.labels.name')}
            style={styles.marginBottomSmall}
            value={name}
            isInvalid={showValidation && !nameIsValid}
            onChangeValue={setName}
          />

          <AppServingInput
            style={[styles.marginBottomSmall]}
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
            style={styles.marginBottomSmall}
            value={calories}
            onChangeValue={setCalories}
          />

          <AppNumberInput
            label={t('app.labels.carbs')}
            postfix={t('app.units.g')}
            style={styles.marginBottomSmall}
            value={carbs}
            onChangeValue={setCarbs}
          />

          <AppNumberInput
            label={t('app.labels.protein')}
            postfix={t('app.units.g')}
            style={styles.marginBottomSmall}
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

        <AppNutrientsPieChart
          nutrients={{ calories, carbs, protein, fat }}
          style={styles.marginBottomMedium}
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
  marginBottomSmall: {
    marginBottom: appTheme.gaps.small,
  },
  marginBottomMedium: {
    marginBottom: appTheme.gaps.medium,
  },
});
