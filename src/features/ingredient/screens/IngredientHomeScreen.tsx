import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppStackScreenProps } from 'app/models';
import { AppButton } from 'app/components';
import { appTheme } from 'app/theme';
import { IngredientStackParamList, Ingredient } from '../models';
import { IngredientTable } from '../components';

type IngredientHomeScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientHome'>;

export function IngredientHomeScreen(props: IngredientHomeScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();

  function onSelectIngredient(ingredient: Ingredient) {
    navigation.push('IngredientEdit', { ingredient });
  }

  return (
    <ScrollView style={styles.container}>
      <AppButton
        style={styles.newIngredientButton}
        backgroundColor={appTheme.colors.ingredientPrimary}
        label={t('ingredient.ingredientHomeScreen.createIngredient')}
        onPress={() => navigation.push('IngredientCreate')}
      />

      <IngredientTable
        style={styles.table}
        onSelectIngredient={onSelectIngredient}
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
