import React from 'react';

import { AppStackScreenProps, AppStackParamList } from 'app/models';
import { AppScreen } from 'app/components';
import { IngredientEditor } from '../components';

type IngredientEditScreenProps = AppStackScreenProps<AppStackParamList, 'IngredientEdit'>;

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
    <AppScreen>
      <IngredientEditor
        ingredient={ingredient}
        onDiscard={() => navigation.goBack()}
        onAfterSave={() => navigation.navigate('IngredientHome')}
        onAfterDelete={() => navigation.navigate('IngredientHome')}
      />
    </AppScreen>
  );
}
