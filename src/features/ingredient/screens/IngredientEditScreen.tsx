import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { appTheme } from 'app/theme';
import { Ingredient, IngredientStackParamList } from '../models';
import { IngredientEditor } from '../components';
import { ingredientService } from '../services';

type IngredientEditScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientEdit'>;

/**
 * Ingredient editing screen.
 */
export function IngredientEditScreen(props: IngredientEditScreenProps) {
  const {
    navigation,
    route: {
      params: { ingredient },
    },
  } = props;

  async function onSave(ingredientToSave: Ingredient) {
    await ingredientService.saveIngredient(ingredientToSave);
    navigation.push('IngredientHome');
  }

  async function onDelete(ingredientToDelete: Ingredient) {
    await ingredientService.deleteIngredient(ingredientToDelete);
    navigation.push('IngredientHome');
  }

  return (
    <ScrollView style={styles.container}>
      <IngredientEditor
        ingredient={ingredient}
        onDiscard={() => navigation.goBack()}
        onSave={onSave}
        onDelete={onDelete}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: appTheme.gaps.medium,
    flex: 1,
  },
});
