import React, { useEffect, useState } from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  AppTextInput,
  AppConfirmationDialog,
  AppButtonGroup,
  AppButton,
  AppItemList,
  AppScrollView,
  AppNutrientsPieChart,
  AppItemProxyEditorDialog,
  AppServingInput,
} from 'app/components';
import { appTheme } from 'app/theme';
import { AppItemProxy } from 'app/models';
import { useAppDispatch } from 'app/store/hooks';
import { appState } from 'app/state';
import { Ingredient, IngredientSelectorDialog } from 'features/ingredient';
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
  const dispatch = useAppDispatch();

  const [name, setName] = useState(recipe.name);
  const [servingValue, setServingValue] = useState(recipe.serving.value);
  const [servingUnit, setServingUnit] = useState(recipe.serving.unit);
  const [ingredientProxies, setIngredientProxies] = useState(recipe.ingredientProxies || []);

  const [showValidation, setShowValidation] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(Recipe.validateName(name));
  const [servingValueIsValid, setServingValueIsValid] = useState(Recipe.validateServingValue(recipe.serving.value));

  const [selectedIngredientProxy, setSelectedIngredientProxy] = useState<AppItemProxy<Ingredient> | null>(null);

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [isIngredientSelectorDialogVisible, setIsIngredientSelectorDialogVisible] = useState(false);

  useEffect(() => {
    setNameIsValid(Recipe.validateName(name));
  }, [name]);

  useEffect(() => {
    setServingValueIsValid(Recipe.validateServingValue(servingValue));
  }, [servingValue]);

  async function onSaveButtonPress() {
    if (validateForm()) {
      dispatch(appState.actions.startLoading());
      await recipeService.saveOne(
        new Recipe({
          id: recipe.id,
          name,
          servings: [
            {
              value: servingValue,
              unit: servingUnit,
            },
          ],
          ingredientProxies,
        })
      );
      dispatch(appState.actions.stopLoading());
      dispatch(
        appState.actions.showNotification({
          textKey: `recipe.notifications.${isNewRecipe ? 'created' : 'updated'}`,
        })
      );
      onAfterSave();
    }
  }

  async function onDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);
    dispatch(appState.actions.startLoading());
    await recipeService.deleteOne(recipe);
    dispatch(appState.actions.stopLoading());
    dispatch(
      appState.actions.showNotification({
        textKey: 'recipe.notifications.deleted',
      })
    );
    onAfterDelete && onAfterDelete();
  }

  function validateForm() {
    !showValidation && setShowValidation(true);
    return nameIsValid && servingValueIsValid;
  }

  function onEditIngredientsSave(ingredients: Ingredient[]) {
    setIngredientProxies(AppItemProxy.mapItemsToProxies(ingredients, ingredientProxies));
    setIsIngredientSelectorDialogVisible(false);
  }

  function onEditIngredientProxySave(updatedIngredientProxy: AppItemProxy<Ingredient>) {
    setIngredientProxies([
      ...ingredientProxies.map((ingredientProxy) =>
        ingredientProxy.id === updatedIngredientProxy.id ? updatedIngredientProxy : ingredientProxy
      ),
    ]);
    setSelectedIngredientProxy(null);
  }

  function onEditIngredientProxyDelete(ingredientProxyToDelete: AppItemProxy<Ingredient>) {
    setIngredientProxies([
      ...ingredientProxies.filter((ingredientProxy) => ingredientProxy.id !== ingredientProxyToDelete.id),
    ]);
    setSelectedIngredientProxy(null);
  }

  async function refreshRecipe() {
    if (!isNewRecipe) {
      dispatch(appState.actions.startLoading());
      const refreshedRecipe = (await recipeService.getOneById(recipe.id)) || recipe;
      dispatch(appState.actions.stopLoading());

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

        <AppServingInput
          style={[styles.row]}
          value={servingValue}
          unit={servingUnit}
          unitOptions={Recipe.AVAILABLE_SERVING_UNITS}
          isInvalid={showValidation && !servingValueIsValid}
          onChangeValue={setServingValue}
          onChangeUnit={setServingUnit}
        />

        <AppButton
          label={t(`recipe.recipeEditor.buttons.${ingredientProxies.length ? 'editIngredients' : 'addIngredients'}`)}
          backgroundColor={appTheme.colors.ingredientPrimary}
          onPress={() => setIsIngredientSelectorDialogVisible(true)}
        />

        <AppItemList
          isCaloriesSummaryVisible
          style={styles.ingredientProxiesList}
          items={ingredientProxies}
          onSelectItem={(ingredientProxy) => setSelectedIngredientProxy(ingredientProxy)}
        />

        <AppNutrientsPieChart
          style={styles.chart}
          nutrients={Recipe.getNutrientsFromIngredientProxies(ingredientProxies)}
        />
      </AppScrollView>

      {isIngredientSelectorDialogVisible && (
        <IngredientSelectorDialog
          selectedIngredients={ingredientProxies.map(({ item }) => item)}
          onDiscard={() => setIsIngredientSelectorDialogVisible(false)}
          onSave={onEditIngredientsSave}
        />
      )}

      {selectedIngredientProxy && (
        <AppItemProxyEditorDialog
          itemProxy={selectedIngredientProxy}
          primaryColor={appTheme.colors.ingredientPrimary}
          text={t('recipe.recipeEditor.buttons.editServingsText')}
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
  ingredientProxiesList: {
    marginBottom: appTheme.gaps.medium,
  },
  chart: {
    marginBottom: appTheme.gaps.medium,
  },
});
