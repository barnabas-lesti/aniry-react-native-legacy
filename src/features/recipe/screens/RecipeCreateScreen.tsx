import React from 'react';

import { AppStackScreenProps } from 'app/models';
import { AppScreen } from 'app/components';
import { RecipeStackParamList } from '../models';
import { RecipeEditor } from '../components';

type RecipeCreateScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeCreate'>;

export function RecipeCreateScreen(props: RecipeCreateScreenProps) {
  const { navigation } = props;

  return (
    <AppScreen>
      <RecipeEditor
        onDiscard={() => navigation.goBack()}
        onAfterSave={() => navigation.push('RecipeHome')}
      />
    </AppScreen>
  );
}
