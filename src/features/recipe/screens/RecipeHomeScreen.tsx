import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { appTheme } from 'app/theme';
import { AppStackScreenProps } from 'app/models';
import { AppButton } from 'app/components';
import { RecipeStackParamList } from '../models';
import { RecipeList } from '../components';

type RecipeHomeScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeHome'>;

export function RecipeHomeScreen(props: RecipeHomeScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      <AppButton
        style={styles.newRecipeButton}
        backgroundColor={appTheme.colors.recipePrimary}
        label={t('recipe.recipeHomeScreen.createRecipe')}
        onPress={() => navigation.push('RecipeCreate')}
      />

      {isFocused && <RecipeList onSelectRecipe={(recipe) => navigation.push('RecipeEdit', { recipe })} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: appTheme.gaps.medium,
    flex: 1,
  },
  newRecipeButton: {
    marginBottom: appTheme.gaps.medium,
  },
});
