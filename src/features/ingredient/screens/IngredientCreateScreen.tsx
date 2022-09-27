import React from 'react';

import { AppStackScreenProps } from 'app/models';
import { AppScreen } from 'app/components';
import { useAppDispatch } from 'app/store/hooks';
import { appState } from 'app/state';
import { Ingredient, IngredientStackParamList } from '../models';
import { IngredientEditor } from '../components';
import { ingredientState } from '../state';

type IngredientCreateScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientCreate'>;

/**
 * Ingredient create screen.
 */
export function IngredientCreateScreen(props: IngredientCreateScreenProps) {
  const { navigation } = props;
  const dispatch = useAppDispatch();

  function onDiscard() {
    navigation.goBack();
  }

  async function onSave(ingredientInstance: Ingredient) {
    await dispatch(ingredientState.asyncActions.createIngredient(ingredientInstance));
    dispatch(appState.actions.showNotification({ textKey: 'ingredient.notifications.created' }));
    navigation.push('IngredientHome');
  }

  return (
    <AppScreen>
      <IngredientEditor
        onDiscard={onDiscard}
        onSave={onSave}
      />
    </AppScreen>
  );
}
