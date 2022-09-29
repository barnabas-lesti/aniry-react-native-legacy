import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
import { useAppDispatch } from 'app/store/hooks';
import { appState } from 'app/state';
import { Ingredient } from '../models';
import { ingredientState } from '../state';

interface IngredientEditorProps {
  /**
   * The ingredient.
   */
  ingredient?: Ingredient;

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
  const { ingredient = new Ingredient(), onDiscard, onAfterSave, onAfterDelete } = props;
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
  const [description, setDescription] = useState(ingredient.description || '');

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
      const newIngredient = new Ingredient({
        id: ingredient.id,
        name,
        description,
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
      });

      if (isNewIngredient) {
        await dispatch(ingredientState.asyncActions.createIngredient(newIngredient));
        dispatch(appState.actions.showNotification({ textKey: 'ingredient.notifications.created' }));
      } else {
        await dispatch(ingredientState.asyncActions.updateIngredient(newIngredient));
        dispatch(appState.actions.showNotification({ textKey: 'ingredient.notifications.updated' }));
      }

      onAfterSave();
    }
  }

  async function onDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);

    await dispatch(ingredientState.asyncActions.deleteIngredient(ingredient));
    dispatch(appState.actions.showNotification({ textKey: 'ingredient.notifications.deleted' }));

    onAfterDelete && onAfterDelete();
  }

  function validateForm() {
    !showValidation && setShowValidation(true);
    return nameIsValid && servingValueIsValid;
  }

  return (
    <View style={styles.container}>
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
        <AppTextInput
          label={t('app.labels.name')}
          style={styles.marginBottomSmall}
          value={name}
          isInvalid={showValidation && !nameIsValid}
          onChangeValue={setName}
        />

        <AppServingInput
          style={styles.marginBottomSmall}
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

        {!!(carbs || protein || fat) && (
          <AppNutrientsPieChart
            nutrients={{ calories, carbs, protein, fat }}
            style={[styles.marginTopMedium, styles.marginBottomSmall]}
          />
        )}

        <AppTextInput
          label={t('app.labels.description')}
          style={[styles.marginTopSmall, styles.marginBottomMedium]}
          value={description}
          onChangeValue={setDescription}
          isMultiline
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
  marginTopMedium: {
    marginTop: appTheme.gaps.medium,
  },
  marginTopSmall: {
    marginTop: appTheme.gaps.small,
  },
});
