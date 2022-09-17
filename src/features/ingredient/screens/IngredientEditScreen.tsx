import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { Ingredient, IngredientStackParamList } from '../models';
import { ingredientService } from '../services';
import { IngredientEditor } from '../components';

type IngredientEditScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientEdit'>;

/**
 * Ingredient editing screen.
 */
export function IngredientEditScreen(props: IngredientEditScreenProps) {
  const { navigation, route } = props;

  const canDelete = !!route.params?.ingredient;
  const ingredient = route.params?.ingredient || new Ingredient();

  async function saveChanges(newIngredient: Ingredient) {
    await ingredientService.saveIngredient(newIngredient);
    navigation.push('IngredientHome');
  }

  function discardChanges() {
    navigation.goBack();
  }

  async function deleteIngredient({ id }: Ingredient) {
    await ingredientService.deleteIngredientById(id);
    navigation.push('IngredientHome');
  }

  return (
    <ScrollView style={styles.container}>
      <IngredientEditor
        ingredient={ingredient}
        onSaveIngredient={saveChanges}
        onDiscardIngredient={discardChanges}
        onDeleteIngredient={canDelete ? deleteIngredient : undefined}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
  },
});
