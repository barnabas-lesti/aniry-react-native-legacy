import React, { useEffect, useState } from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppTextInput, AppNumberInput, AppSelectInput, AppConfirmationDialog, AppButtonGroup } from 'app/components';
import { appTheme } from 'app/theme';
import { Ingredient, IngredientProxy } from 'features/ingredient/models';
import { Recipe, recipeServingUnits } from '../models';
import { recipeService } from '../services';
import { RecipeIngredientsEditorDialog } from './RecipeIngredientsEditorDialog';
import { RecipeIngredientProxyList } from './RecipeIngredientProxyList';

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
  const [isEditIngredientsDialogVisible, setIsEditIngredientsDialogVisible] = useState(false);

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
      ingredientProxies,
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

  function onEditIngredientsSave(ingredients: Ingredient[]) {
    setIngredientProxies(mapIngredientsToIngredientProxies(ingredientProxies, ingredients));
    setIsEditIngredientsDialogVisible(false);
  }

  function mapIngredientsToIngredientProxies(
    existingIngredientProxies: IngredientProxy[],
    ingredients: Ingredient[]
  ): IngredientProxy[] {
    return [
      ...ingredients.map((ingredient) => {
        const ingredientProxy = existingIngredientProxies.filter(({ ingredient: { id } }) => ingredient.id === id)[0];
        return {
          ingredient,
          serving: ingredientProxy?.serving || ingredient.serving,
        };
      }),
    ];
  }

  function onEditServings() {}

  return (
    <View style={style}>
      <AppButtonGroup
        style={styles.buttonGroup}
        buttons={[
          {
            labelKey: 'app.labels.discard',
            type: 'secondary',
            textColor: appTheme.colors.recipePrimary,
            onPress: onDiscard,
          },
          {
            labelKey: `app.labels.${isNewRecipe ? 'create' : 'update'}`,
            isLoading: isSaveInProgress,
            backgroundColor: appTheme.colors.recipePrimary,
            onPress: onSaveButtonPress,
          },
          {
            labelKey: 'app.labels.delete',
            type: 'danger',
            isHidden: isNewRecipe,
            isLoading: isDeleteInProgress,
            onPress: onDeleteButtonPress,
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

      <AppButtonGroup
        style={styles.buttonGroup}
        buttons={[
          {
            labelKey: `recipe.recipeEditor.buttons.${ingredientProxies.length ? 'editIngredients' : 'addIngredients'}`,
            backgroundColor: appTheme.colors.ingredientPrimary,
            onPress: () => setIsEditIngredientsDialogVisible(true),
          },
          {
            labelKey: 'recipe.recipeEditor.buttons.editServings',
            backgroundColor: appTheme.colors.recipePrimary,
            isDisabled: !ingredientProxies.length,
            onPress: onEditServings,
          },
        ]}
      />

      <RecipeIngredientProxyList ingredientProxies={ingredientProxies} />

      <RecipeIngredientsEditorDialog
        isVisible={isEditIngredientsDialogVisible}
        selectedIngredients={recipe.ingredientProxies.map(({ ingredient }) => ingredient)}
        onDiscard={() => setIsEditIngredientsDialogVisible(false)}
        onSave={onEditIngredientsSave}
      />

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
