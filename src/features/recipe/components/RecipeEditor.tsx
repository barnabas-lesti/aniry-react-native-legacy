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
} from 'app/components';
import { appTheme } from 'app/theme';
import { Ingredient, IngredientProxyList, IngredientProxy, IngredientSelectorDialog } from 'features/ingredient';
import { Recipe, recipeServingUnits } from '../models';
import { recipeService } from '../services';
import { IngredientProxyEditorDialog } from 'features/ingredient/components/IngredientProxyEditorDialog';

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
  const [isSaveInProgress, setIsSaveInProgress] = useState(false);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);

  const [ingredientProxies, setIngredientProxies] = useState(recipe.ingredientProxies || []);
  const [isIngredientSelectorDialogVisible, setIsIngredientSelectorDialogVisible] = useState(false);

  const [selectedIngredientProxy, setSelectedIngredientProxy] = useState<IngredientProxy | null>(null);

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
    if (validateForm()) {
      setIsSaveInProgress(true);
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
      setIsSaveInProgress(false);

      onAfterSave();
    }
  }

  async function onDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);

    setIsDeleteInProgress(true);
    await recipeService.deleteRecipeById(recipe.id);
    setIsDeleteInProgress(false);

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

  function validateServingUnit(value: keyof typeof recipeServingUnits) {
    return !!recipeServingUnits[value];
  }

  function onEditIngredientsSave(ingredients: Ingredient[]) {
    setIngredientProxies(mapIngredientsToIngredientProxies(ingredientProxies, ingredients));
    setIsIngredientSelectorDialogVisible(false);
  }

  function mapIngredientsToIngredientProxies(
    existingIngredientProxies: IngredientProxy[],
    ingredients: Ingredient[]
  ): IngredientProxy[] {
    return [
      ...ingredients.map((ingredient) => {
        const ingredientProxy = existingIngredientProxies.filter(({ ingredient: { id } }) => ingredient.id === id)[0];
        return new IngredientProxy({
          ingredient,
          serving: ingredientProxy?.serving || ingredient.serving,
        });
      }),
    ];
  }

  function onEditIngredientProxySave(updatedIngredientProxy: IngredientProxy) {
    setSelectedIngredientProxy(null);
    setIngredientProxies([
      ...ingredientProxies.map((ingredientProxy) =>
        ingredientProxy.id === updatedIngredientProxy.id ? updatedIngredientProxy : ingredientProxy
      ),
    ]);
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
            isLoading: isSaveInProgress,
            backgroundColor: appTheme.colors.recipePrimary,
            onPress: onSaveButtonPress,
          },
          {
            label: t('app.labels.delete'),
            type: 'danger',
            isHidden: isNewRecipe,
            isLoading: isDeleteInProgress,
            onPress: () => setIsDeleteConfirmationVisible(true),
          },
        ]}
      />

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

      <IngredientProxyList
        ingredientProxies={ingredientProxies}
        onSelectIngredientProxy={(ingredientProxy) => setSelectedIngredientProxy(ingredientProxy)}
      />

      <IngredientSelectorDialog
        isVisible={isIngredientSelectorDialogVisible}
        selectedIngredients={recipe.ingredientProxies.map(({ ingredient }) => ingredient)}
        onDiscard={() => setIsIngredientSelectorDialogVisible(false)}
        onSave={onEditIngredientsSave}
      />

      {selectedIngredientProxy && (
        <IngredientProxyEditorDialog
          isVisible={!!selectedIngredientProxy}
          ingredientProxy={selectedIngredientProxy}
          onDiscard={() => setSelectedIngredientProxy(null)}
          onSave={onEditIngredientProxySave}
        />
      )}

      {!isNewRecipe && (
        <AppConfirmationDialog
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
