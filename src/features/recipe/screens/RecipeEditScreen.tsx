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
    <AppScreen
      titleKey="recipe.recipeEditScreen.title"
      goBack={() => navigation.goBack()}
    >
      <RecipeEditor
        recipe={recipe}
        onAfterSave={() => navigation.navigate('RecipeHome')}
        onAfterDelete={() => navigation.navigate('RecipeHome')}
      />
    </AppScreen>
  );
}
