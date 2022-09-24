import React, { useEffect, useState } from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  AppTextInput,
  AppNumberInput,
  AppSelectInput,
  AppConfirmationDialog,
  AppButtonGroup,
  AppButton,
  AppItemList,
  AppScrollView,
} from 'app/components';
import { appTheme } from 'app/theme';
import { appItemServingUnits } from 'app/models';
import { appCommonService } from 'app/services';
import {
  Ingredient,
  IngredientProxy,
  IngredientSelectorDialog,
  IngredientProxyEditorDialog,
} from 'features/ingredient';
import { Recipe } from '../models';
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
   * On after save event handler.
   */
  onAfterSave: () => void;

  /**
   * On after delete event handler.
   */
  onAfterDelete?: () => void;
}

/**
 * Recipe editor component.
 */
export function RecipeEditor(props: RecipeEditorProps) {
  const { recipe = new Recipe(), style, onDiscard, onAfterSave, onAfterDelete } = props;

  const isNewRecipe = !recipe.id;

  const { t } = useTranslation();

  const [name, setName] = useState(recipe.name);
  const [servingValue, setServingValue] = useState(recipe.serving.value);
  const [servingUnit, setServingUnit] = useState(recipe.serving.unit);

  const [canValidate, setCanValidate] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(validateName(name));
  const [servingValueIsValid, setServingValueIsValid] = useState(validateServingValue(recipe.serving.value));
  const [servingUnitIsValid, setServingUnitIsValid] = useState(validateServingUnit(recipe.serving.unit));

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

  const [ingredientProxies, setIngredientProxies] = useState(recipe.ingredientProxies || []);
  const [isIngredientSelectorDialogVisible, setIsIngredientSelectorDialogVisible] = useState(false);

  const [selectedIngredientProxy, setSelectedIngredientProxy] = useState<IngredientProxy | null>(null);

  const servingUnitOptions = Object.keys(appItemServingUnits).map((unit) => ({
    value: unit,
    label: t(appItemServingUnits[unit as keyof typeof appItemServingUnits]),
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
    if (validateForm()) {
      appCommonService.startLoading();
      await recipeService.saveRecipe(
        new Recipe({
          id: recipe.id,
          name,
          serving: {
            value: servingValue,
            unit: servingUnit,
          },
          ingredientProxies,
        })
      );
      appCommonService.stopLoading();
      onAfterSave();
    }
  }

  async function onDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);
    appCommonService.startLoading();
    await recipeService.deleteRecipeById(recipe.id);
    appCommonService.stopLoading();
    onAfterDelete && onAfterDelete();
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

  function validateServingUnit(value: keyof typeof appItemServingUnits) {
    return !!appItemServingUnits[value];
  }

  function onEditIngredientsSave(ingredients: Ingredient[]) {
    setIngredientProxies(IngredientProxy.mapIngredientsToIngredientProxies(ingredients, ingredientProxies));
    setIsIngredientSelectorDialogVisible(false);
  }

  function onEditIngredientProxySave(updatedIngredientProxy: IngredientProxy) {
    setIngredientProxies([
      ...ingredientProxies.map((ingredientProxy) =>
        ingredientProxy.id === updatedIngredientProxy.id ? updatedIngredientProxy : ingredientProxy
      ),
    ]);
    setSelectedIngredientProxy(null);
  }

  function onEditIngredientProxyDelete(ingredientProxyToDelete: IngredientProxy) {
    setIngredientProxies([
      ...ingredientProxies.filter((ingredientProxy) => ingredientProxy.id !== ingredientProxyToDelete.id),
    ]);
    setSelectedIngredientProxy(null);
  }

  return (
    <View style={[styles.container, style]}>
      <AppButtonGroup
        style={styles.buttonGroup}
        buttons={[
          {
            label: t('app.labels.discard'),
            type: 'secondary',
            textColor: appTheme.colors.recipePrimary,
            onPress: onDiscard,
          },
          {
            label: t(`app.labels.${isNewRecipe ? 'create' : 'update'}`),
            backgroundColor: appTheme.colors.recipePrimary,
            onPress: onSaveButtonPress,
          },
          {
            label: t('app.labels.delete'),
            type: 'danger',
            isHidden: isNewRecipe,
            onPress: () => setIsDeleteConfirmationVisible(true),
          },
        ]}
      />

      <AppScrollView>
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

        <AppButton
          label={t(`recipe.recipeEditor.buttons.${ingredientProxies.length ? 'editIngredients' : 'addIngredients'}`)}
          backgroundColor={appTheme.colors.ingredientPrimary}
          onPress={() => setIsIngredientSelectorDialogVisible(true)}
        />

        <AppItemList
          items={ingredientProxies}
          onSelectItem={(ingredientProxy) => setSelectedIngredientProxy(ingredientProxy)}
        />
      </AppScrollView>

      {isIngredientSelectorDialogVisible && (
        <IngredientSelectorDialog
          selectedIngredients={ingredientProxies.map(({ ingredient }) => ingredient)}
          onDiscard={() => setIsIngredientSelectorDialogVisible(false)}
          onSave={onEditIngredientsSave}
        />
      )}

      {selectedIngredientProxy && (
        <IngredientProxyEditorDialog
          ingredientProxy={selectedIngredientProxy}
          onDiscard={() => setSelectedIngredientProxy(null)}
          onSave={onEditIngredientProxySave}
          onDelete={onEditIngredientProxyDelete}
        />
      )}

      {!isNewRecipe && isDeleteConfirmationVisible && (
        <AppConfirmationDialog
          text={t('recipe.recipeEditor.deleteConfirmation')}
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
  row: {
    marginBottom: appTheme.gaps.small,
  },
  buttonGroup: {
    marginBottom: appTheme.gaps.medium,
  },
  servingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: appTheme.gaps.medium,
  },
  servingValue: {
    marginRight: appTheme.gaps.small,
    flexGrow: 1,
  },
  servingUnit: {
    minWidth: 70,
  },
});
