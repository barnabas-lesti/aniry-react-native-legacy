import React from 'react';

import { AppStackScreenProps, AppStackParamList } from 'app/models';
import { AppScreen } from 'app/components';
import { RecipeEditor } from '../components';

type RecipeCreateScreenProps = AppStackScreenProps<AppStackParamList, 'RecipeCreate'>;

export function RecipeCreateScreen(props: RecipeCreateScreenProps) {
  const { navigation } = props;

  return (
    <AppScreen>
      <RecipeEditor
        onDiscard={() => navigation.goBack()}
        onAfterSave={() => navigation.navigate('RecipeHome')}
      />
    </AppScreen>
  );
}
