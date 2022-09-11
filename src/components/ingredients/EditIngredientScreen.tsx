import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Ingredient } from 'src/store/states/ingredients';
import { IngredientEditor } from './IngredientEditor';

export function EditIngredientScreen() {
  const ingredient: Ingredient = {
    name: 'Onions',
    serving: {
      value: 100,
      unit: 'g',
    },
    nutrients: {
      calories: 40,
      carbs: 2,
      protein: 4,
      fat: 0.3,
    },
  };

  return (
    <View style={styles.container}>
      <IngredientEditor ingredient={ingredient} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
