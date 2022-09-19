import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { appTheme } from 'app/theme';
import { AppStackScreenProps } from 'app/models';
import { AppButton } from 'app/components';
import { Recipe, RecipeStackParamList } from '../models';
import { RecipeTable } from '../components';

type RecipeHomeScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeHome'>;

export function RecipeHomeScreen(props: RecipeHomeScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();

  function onSelectRecipe(recipe: Recipe) {
    navigation.push('RecipeEdit', { recipe });
  }

  return (
    <ScrollView style={styles.container}>
      <AppButton
        style={styles.newIngredientButton}
        backgroundColor={appTheme.colors.recipePrimary}
        label={t('recipe.recipeHomeScreen.createRecipe')}
        onPress={() => navigation.push('RecipeCreate')}
      />

      <RecipeTable
        style={styles.table}
        onSelectRecipe={onSelectRecipe}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: appTheme.gaps.medium,
    flex: 1,
  },
  table: {
    marginBottom: appTheme.gaps.medium,
  },
  newIngredientButton: {
    marginBottom: appTheme.gaps.medium,
  },
});
