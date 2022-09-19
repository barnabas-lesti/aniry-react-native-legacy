import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { appTheme } from 'app/theme';
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

  function onAfterSave() {
    navigation.push('IngredientHome');
  }

  function onAfterDelete() {
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
        onAfterSave={onAfterSave}
        onAfterDelete={onAfterDelete}
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
