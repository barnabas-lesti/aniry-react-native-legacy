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
import { appServingUnitOptions } from 'app/models';
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
  const [ingredientProxies, setIngredientProxies] = useState(recipe.ingredientProxies || []);

  const [showValidation, setShowValidation] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(Recipe.validateName(name));
  const [servingValueIsValid, setServingValueIsValid] = useState(Recipe.validateServingValue(recipe.serving.value));
  const [servingUnitIsValid, setServingUnitIsValid] = useState(Recipe.validateServingUnit(recipe.serving.unit));

  const [selectedIngredientProxy, setSelectedIngredientProxy] = useState<IngredientProxy | null>(null);

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [isIngredientSelectorDialogVisible, setIsIngredientSelectorDialogVisible] = useState(false);

  useEffect(() => {
    setNameIsValid(Recipe.validateName(name));
  }, [name]);

  useEffect(() => {
    setServingValueIsValid(Recipe.validateServingValue(servingValue));
  }, [servingValue]);

  useEffect(() => {
    setServingUnitIsValid(Recipe.validateServingUnit(servingUnit));
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
    !showValidation && setShowValidation(true);
    return nameIsValid && servingValueIsValid && servingUnitIsValid;
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

  async function refreshRecipe() {
    if (!isNewRecipe) {
      appCommonService.startLoading();
      const refreshedRecipe = (await recipeService.getRecipeById(recipe.id)) || recipe;
      appCommonService.stopLoading();

      setName(refreshedRecipe.name);
      setServingValue(refreshedRecipe.serving.value);
      setServingUnit(refreshedRecipe.serving.unit);
      setIngredientProxies(refreshedRecipe.ingredientProxies || []);
    }
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

      <AppScrollView onRefresh={refreshRecipe}>
        <AppTextInput
          label={t('app.labels.name')}
          style={styles.row}
          value={name}
          isInvalid={showValidation && !nameIsValid}
          onChangeValue={setName}
        />

        <View style={[styles.row, styles.servingContainer]}>
          <AppNumberInput
            style={styles.servingValue}
            label={t('app.labels.serving')}
            value={servingValue}
            isInvalid={showValidation && !servingValueIsValid}
            onChangeValue={setServingValue}
          />
          <AppSelectInput
            style={styles.servingUnit}
            options={appServingUnitOptions}
            value={servingUnit}
            isInvalid={showValidation && !servingUnitIsValid}
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
