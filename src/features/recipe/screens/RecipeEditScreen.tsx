import React from 'react';

import { AppStackScreenProps } from 'app/models';
import { AppScreen } from 'app/components';
import { RecipeStackParamList } from '../models';
import { RecipeEditor } from '../components';

type RecipeEditScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeEdit'>;

/**
 * Recipe editing screen.
 */
export function RecipeEditScreen(props: RecipeEditScreenProps) {
  const {
    navigation,
    route: {
      params: { recipe },
    },
  } = props;

  return (
    <AppScreen>
      <RecipeEditor
        recipe={recipe}
        onDiscard={() => navigation.goBack()}
        onAfterSave={() => navigation.push('RecipeHome')}
        onAfterDelete={() => navigation.push('RecipeHome')}
      />
    </AppScreen>
  );
}
