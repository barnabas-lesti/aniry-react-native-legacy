import React from 'react';

import { AppStackScreenProps } from 'app/models';
import { AppScreen } from 'app/components';
import { Ingredient, IngredientStackParamList } from '../models';
import { IngredientEditor } from '../components';
import { useAppDispatch } from 'app/store/hooks';
import { ingredientState } from '../state';
import { appState } from 'app/state';

type IngredientEditScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientEdit'>;

/**
 * Ingredient editing screen.
 */
export function IngredientEditScreen(props: IngredientEditScreenProps) {
  const {
    navigation,
    route: {
      params: { ingredient },
    },
  } = props;

  const dispatch = useAppDispatch();

  function onDiscard() {
    navigation.goBack();
  }

  async function onSave(ingredientInstance: Ingredient) {
    await dispatch(ingredientState.asyncActions.updateIngredient(ingredientInstance));
    dispatch(appState.actions.showNotification({ textKey: 'ingredient.notifications.updated' }));
    navigation.push('IngredientHome');
  }

  async function onDelete(ingredientInstance: Ingredient) {
    await dispatch(ingredientState.asyncActions.deleteIngredient(ingredientInstance));
    dispatch(appState.actions.showNotification({ textKey: 'ingredient.notifications.deleted' }));
    navigation.push('IngredientHome');
  }

  return (
    <AppScreen>
      <IngredientEditor
        ingredientInstance={new Ingredient(ingredient)}
        onDiscard={onDiscard}
        onSave={onSave}
        onDelete={onDelete}
      />
    </AppScreen>
  );
}
