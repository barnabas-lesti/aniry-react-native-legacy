import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Ingredient } from '../models';
import { ingredientsService } from '../services';
import { IngredientEditor } from './IngredientEditor';
import { AppStackParamList } from 'app/models';

type EditIngredientScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'EditIngredient'
>;

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
    <KeyboardAwareScrollView style={styles.container}>
      <IngredientEditor
        ingredient={ingredient}
        onSaveIngredient={saveChanges}
        onDiscardIngredient={discardChanges}
        onDeleteIngredient={canDelete ? deleteIngredient : undefined}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
  },
});
