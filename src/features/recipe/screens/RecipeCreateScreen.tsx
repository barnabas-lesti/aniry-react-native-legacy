import React from 'react';

import { AppStackScreenProps } from 'app/models';
import { AppScreen } from 'app/components';
import { RecipeStackParamList } from '../models';
import { RecipeEditor } from '../components';

type RecipeCreateScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeCreate'>;

export function RecipeCreateScreen(props: RecipeCreateScreenProps) {
  const { navigation } = props;

  return (
    <AppScreen
      titleKey="recipe.recipeCreateScreen.title"
      goBack={() => navigation.goBack()}
    >
      <RecipeEditor onAfterSave={() => navigation.navigate('RecipeHome')} />
    </AppScreen>
  );
}
