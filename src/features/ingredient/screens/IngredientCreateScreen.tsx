import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { appTheme } from 'app/theme';
import { Ingredient, IngredientStackParamList } from '../models';
import { IngredientEditor } from '../components';
import { ingredientService } from '../services';

type IngredientCreateScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientCreate'>;

export function IngredientCreateScreen(props: IngredientCreateScreenProps) {
  const { navigation } = props;

  async function onSave(ingredient: Ingredient) {
    await ingredientService.saveIngredient(ingredient);
    navigation.push('IngredientHome');
  }

  return (
    <ScrollView style={styles.container}>
      <IngredientEditor
        onDiscard={() => navigation.goBack()}
        onSave={onSave}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: appTheme.gaps.medium,
  },
});
