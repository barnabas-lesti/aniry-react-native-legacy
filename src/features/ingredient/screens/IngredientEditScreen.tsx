import React from 'react';

import { AppStackScreenProps } from 'app/models';
import { AppScreen } from 'app/components';
import { IngredientStackParamList } from '../models';
import { IngredientEditor } from '../components';

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

  return (
    <AppScreen
      titleKey="ingredient.ingredientEditScreen.title"
      goBack={() => navigation.goBack()}
    >
      <IngredientEditor
        ingredient={ingredient}
        onAfterSave={() => navigation.navigate('IngredientHome')}
        onAfterDelete={() => navigation.navigate('IngredientHome')}
      />
    </AppScreen>
  );
}
