import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppStackScreenProps } from 'app/models';
import { AppButton, AppScreen } from 'app/components';
import { appTheme } from 'app/theme';
import { RecipeStackParamList } from '../models';
import { RecipeList } from '../components';

type RecipeHomeScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeHome'>;

export function RecipeHomeScreen(props: RecipeHomeScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();

  return (
    <AppScreen>
      <AppButton
        style={styles.newRecipeButton}
        backgroundColor={appTheme.colors.recipePrimary}
        label={t('recipe.recipeHomeScreen.createRecipe')}
        onPress={() => navigation.push('RecipeCreate')}
      />

      <RecipeList onSelect={(recipe) => navigation.push('RecipeEdit', { recipe })} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  newRecipeButton: {
    marginBottom: appTheme.gaps.medium,
  },
});
