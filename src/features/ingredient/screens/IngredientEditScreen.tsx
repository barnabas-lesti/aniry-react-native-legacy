import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { IngredientStackParamList } from '../models';
import { IngredientEditor } from '../components';

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

  async function onAfterSaveAndDelete() {
    navigation.push('IngredientHome');
  }

  function onDiscard() {
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <IngredientEditor
        ingredient={ingredient}
        onDiscard={onDiscard}
        onAfterSave={onAfterSaveAndDelete}
        onAfterDelete={onAfterSaveAndDelete}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
  },
});
