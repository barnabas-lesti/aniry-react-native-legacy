import React from 'react';

import { AppStackScreenProps } from 'app/models';
import { AppLayoutScreen } from 'app/components';
import { IngredientEditor } from '../components';
import { IngredientStackParamList } from '../models';

type IngredientCreateScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientCreate'>;

/**
 * Ingredient create screen.
 */
export function IngredientCreateScreen(props: IngredientCreateScreenProps) {
  const { navigation } = props;

  return (
    <AppLayoutScreen
      titleKey="ingredient.ingredientCreateScreen.title"
      goBack={() => navigation.goBack()}
    >
      <IngredientEditor onAfterSave={() => navigation.push('IngredientHome')} />
    </AppLayoutScreen>
  );
}
