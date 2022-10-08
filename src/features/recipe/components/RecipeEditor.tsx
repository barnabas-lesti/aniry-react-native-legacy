import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  AppTextInput,
  AppConfirmationDialog,
  AppButtonGroup,
  AppButton,
  AppList,
  AppScrollView,
  AppNutrientsPieChart,
  AppItemProxyEditorDialog,
  AppServingInput,
} from 'app/components';
import { appStyles, appTheme } from 'app/theme';
import { AppItemProxy } from 'app/models';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { appState } from 'app/state';
import { Ingredient } from 'features/ingredient/models';
import { IngredientSelectorDialog } from 'features/ingredient/components';
import { Recipe } from '../models';
import { recipeState } from '../state';

interface RecipeEditorProps {
  /**
   * The recipe object.
   */
  recipe?: Recipe;

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
  const { recipe = new Recipe(), onDiscard, onAfterSave, onAfterDelete } = props;
  const isNewRecipe = !recipe.id;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { recipes } = useAppSelector((state) => state.recipe);

  const [name, setName] = useState(recipe.name);
  const [servingValue, setServingValue] = useState(recipe.serving.value);
  const [servingUnit, setServingUnit] = useState(recipe.serving.unit);
  const [description, setDescription] = useState(recipe.description || '');
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
      const newRecipe = new Recipe({
        id: recipe.id,
        name,
        description,
        servings: [
          {
            value: servingValue,
            unit: servingUnit,
          },
        ],
        ingredientProxies,
      });

      if (isNewRecipe) {
        await dispatch(recipeState.asyncActions.createRecipe(newRecipe));
        dispatch(appState.actions.showNotification({ textKey: 'recipe.notifications.created' }));
      } else {
        await dispatch(recipeState.asyncActions.updateRecipe(newRecipe));
        dispatch(appState.actions.showNotification({ textKey: 'recipe.notifications.updated' }));
      }

      onAfterSave();
    }
  }

  async function onDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);

    await dispatch(recipeState.asyncActions.deleteRecipe(recipe));
    dispatch(appState.actions.showNotification({ textKey: 'recipe.notifications.deleted' }));

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

  async function onRefresh() {
    if (!isNewRecipe) {
      await dispatch(recipeState.asyncActions.loadRecipes());
      const refreshedRecipe = new Recipe((recipes || []).filter((recipeInStore) => recipeInStore.id === recipe.id)[0]);
      setIngredientProxies(refreshedRecipe.ingredientProxies);
    }
  }

  return (
    <>
      <View style={appStyles.section}>
        <AppButtonGroup
          style={appStyles.sectionRow}
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
      </View>

      <AppScrollView onRefresh={onRefresh}>
        <View style={appStyles.section}>
          <Text style={appStyles.sectionTitle}>{t('recipe.recipeEditor.primaryDetailsTitle')}</Text>
          <AppTextInput
            label={t('app.labels.name')}
            style={appStyles.sectionRow}
            value={name}
            isInvalid={showValidation && !nameIsValid}
            onChangeValue={setName}
          />
          <AppServingInput
            style={appStyles.sectionRow}
            value={servingValue}
            unit={servingUnit}
            unitOptions={Recipe.AVAILABLE_SERVING_UNITS}
            isInvalid={showValidation && !servingValueIsValid}
            onChangeValue={setServingValue}
            onChangeUnit={setServingUnit}
          />
        </View>

        <View style={appStyles.section}>
          <Text style={appStyles.sectionTitle}>{t('recipe.recipeEditor.ingredientsTitle')}</Text>
          <AppButton
            style={appStyles.sectionRow}
            label={t(`recipe.recipeEditor.buttons.${ingredientProxies.length ? 'editIngredients' : 'addIngredients'}`)}
            backgroundColor={appTheme.colors.ingredientPrimary}
            onPress={() => setIsIngredientSelectorDialogVisible(true)}
          />
          {!!ingredientProxies.length && (
            <>
              <AppList
                scrollDisabled
                withCalorieSummary
                style={appStyles.sectionRow}
                items={ingredientProxies}
                onSelect={(ingredientProxy) => setSelectedIngredientProxy(ingredientProxy)}
              />
            </>
          )}
        </View>

        {!!ingredientProxies.length && (
          <View style={appStyles.section}>
            <Text style={appStyles.sectionTitle}>{t('recipe.recipeEditor.nutrientsTitle')}</Text>
            <AppNutrientsPieChart
              style={appStyles.sectionRow}
              nutrients={AppItemProxy.getNutrientsFromItemProxies(ingredientProxies)}
            />
          </View>
        )}

        <View style={appStyles.section}>
          <Text style={appStyles.sectionTitle}>{t('recipe.recipeEditor.additionalDetailsTitle')}</Text>
          <AppTextInput
            style={appStyles.sectionRow}
            label={t('app.labels.description')}
            value={description}
            onChangeValue={setDescription}
            isMultiline
          />
        </View>
      </AppScrollView>

      {isIngredientSelectorDialogVisible && (
        <IngredientSelectorDialog
          selectedIngredients={AppItemProxy.mapProxiesToItems(ingredientProxies)}
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
    </>
  );
}
