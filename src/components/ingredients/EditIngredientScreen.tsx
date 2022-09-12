import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useAppNavigation } from 'src/navigation/hooks';
import { Ingredient } from 'src/store/states/ingredients';
import { IngredientEditor } from './IngredientEditor';

export function EditIngredientScreen() {
  const navigation = useAppNavigation<'EditIngredient'>();

  const ingredient = new Ingredient();

  function onSave(newIngredient: Ingredient) {
    console.log(newIngredient);
    navigation.goBack();
  }

  function onDiscard() {
    navigation.goBack();
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <IngredientEditor
        ingredient={ingredient}
        onSave={onSave}
        onDiscard={onDiscard}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
  },
});
