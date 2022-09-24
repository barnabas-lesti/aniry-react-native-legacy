import React from 'react';
import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { appTheme } from 'app/theme';
import { AppStackScreenProps } from 'app/models';
import { AppButton, AppScreen } from 'app/components';
import { RecipeStackParamList } from '../models';
import { RecipeList } from '../components';

type RecipeHomeScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeHome'>;

export function RecipeHomeScreen(props: RecipeHomeScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  return (
    <AppScreen>
      <AppButton
        style={styles.newRecipeButton}
        backgroundColor={appTheme.colors.recipePrimary}
        label={t('recipe.recipeHomeScreen.createRecipe')}
        onPress={() => navigation.push('RecipeCreate')}
      />

      {isFocused && <RecipeList onSelectRecipe={(recipe) => navigation.push('RecipeEdit', { recipe })} />}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  newRecipeButton: {
    marginBottom: appTheme.gaps.medium,
  },
});
