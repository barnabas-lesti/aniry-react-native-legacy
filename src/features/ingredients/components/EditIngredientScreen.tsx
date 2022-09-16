import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { AppStackParamList, AppStackScreenProps } from 'app/navigation';
import { Ingredient } from '../models';
import { ingredientsService } from '../services';
import { IngredientEditor } from './IngredientEditor';

type EditIngredientScreenProps = AppStackScreenProps<AppStackParamList, 'EditIngredient'>;

/**
 * Ingredient editing screen.
 */
export function EditIngredientScreen(props: EditIngredientScreenProps) {
  const { navigation, route } = props;

  const canDelete = !!route.params?.ingredient;
  const ingredient = route.params?.ingredient || new Ingredient();

  async function saveChanges(newIngredient: Ingredient) {
    await ingredientsService.saveIngredient(newIngredient);
    navigation.push('Ingredients');
  }

  function discardChanges() {
    navigation.goBack();
  }

  async function deleteIngredient({ id }: Ingredient) {
    await ingredientsService.deleteIngredientById(id);
    navigation.push('Ingredients');
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
