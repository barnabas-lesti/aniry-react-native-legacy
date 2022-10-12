import React from 'react';

import { AppStackScreenProps, AppStackParamList } from 'app/models';
import { AppScreen } from 'app/components';
import { RecipeEditor } from '../components';

type RecipeEditScreenProps = AppStackScreenProps<AppStackParamList, 'RecipeEdit'>;

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
        onAfterSave={() => navigation.navigate('RecipeHome')}
        onAfterDelete={() => navigation.navigate('RecipeHome')}
      />
    </AppScreen>
  );
}
