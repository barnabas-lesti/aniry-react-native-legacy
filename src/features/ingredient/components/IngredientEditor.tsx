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
} from 'app/components';
import { appTheme } from 'app/theme';
import { appCommonService } from 'app/services';
import { Ingredient } from '../models';
import { ingredientService } from '../services';
import { IngredientServingEditor } from './IngredientServingEditor';

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
  const { nutrients } = ingredient;
  const isNewIngredient = !ingredient.id;

  // console.log(ingredient)

  const { t } = useTranslation();

  const [name, setName] = useState(ingredient.name);
  const [servings, setServings] = useState(ingredient.servings);
  const [calories, setCalories] = useState(nutrients.calories);
  const [carbs, setCarbs] = useState(nutrients.carbs);
  const [protein, setProtein] = useState(nutrients.protein);
  const [fat, setFat] = useState(nutrients.fat);

  const [showValidation, setShowValidation] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(Ingredient.validateName(name));

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

  useEffect(() => {
    setNameIsValid(Ingredient.validateName(name));
  }, [name]);

  async function onSaveButtonPress() {
    if (validateForm()) {
      appCommonService.startLoading();
      await ingredientService.saveOne(
        new Ingredient({
          id: ingredient.id,
          name,
          servings,
          nutrients: {
            calories,
            carbs,
            protein,
            fat,
          },
        })
      );
      appCommonService.stopLoading();
      appCommonService.pushNotificationKey(`ingredient.notifications.${isNewIngredient ? 'created' : 'updated'}`);
      onAfterSave();
    }
  }

  async function onDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);
    appCommonService.startLoading();
    await ingredientService.deleteOne(ingredient);
    appCommonService.stopLoading();
    appCommonService.pushNotificationKey('ingredient.notifications.deleted');
    onAfterDelete && onAfterDelete();
  }

  function validateForm() {
    !showValidation && setShowValidation(true);
    return nameIsValid && Ingredient.validateServingValue(servings[0].value);
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
        <AppTextInput
          label={t('app.labels.name')}
          style={styles.marginBottomMedium}
          value={name}
          isInvalid={showValidation && !nameIsValid}
          onChangeValue={setName}
        />

        <IngredientServingEditor
          style={styles.marginBottomMedium}
          servings={[...servings]}
          onChangeServings={setServings}
        />

        <View style={styles.marginBottomMedium}>
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
