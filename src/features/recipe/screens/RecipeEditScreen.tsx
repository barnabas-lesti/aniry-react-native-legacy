import React from 'react';

import { AppStackScreenProps } from 'app/models';
import { AppLayoutScreen } from 'app/components';
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
    <AppLayoutScreen
      titleKey="recipe.recipeEditScreen.title"
      goBack={() => navigation.goBack()}
    >
      <RecipeEditor
        recipe={recipe}
        onAfterSave={() => navigation.push('RecipeHome')}
        onAfterDelete={() => navigation.push('RecipeHome')}
      />
    </AppLayoutScreen>
  );
}
