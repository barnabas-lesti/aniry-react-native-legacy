import React from 'react';

import { AppStackScreenProps } from 'app/models';
import { AppScreen } from 'app/components';
import { IngredientStackParamList } from '../models';
import { IngredientEditor } from '../components';

type IngredientCreateScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientCreate'>;

/**
 * Ingredient create screen.
 */
export function IngredientCreateScreen(props: IngredientCreateScreenProps) {
  const { navigation } = props;

  return (
    <AppScreen>
      <IngredientEditor
        onDiscard={() => navigation.goBack()}
        onAfterSave={() => navigation.push('IngredientHome')}
      />
    </AppScreen>
  );
}
