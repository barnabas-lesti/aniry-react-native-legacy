import React from 'react';

import { AppStackScreenProps, AppStackParamList } from 'app/models';
import { AppScreen } from 'app/components';
import { IngredientEditor } from '../components';

type IngredientCreateScreenProps = AppStackScreenProps<AppStackParamList, 'IngredientCreate'>;

/**
 * Ingredient create screen.
 */
export function IngredientCreateScreen(props: IngredientCreateScreenProps) {
  const { navigation } = props;

  return (
    <AppScreen>
      <IngredientEditor
        onDiscard={() => navigation.goBack()}
        onAfterSave={() => navigation.navigate('IngredientHome')}
      />
    </AppScreen>
  );
}
