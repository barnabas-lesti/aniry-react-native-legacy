import React from 'react';
import { StyleSheet } from 'react-native';

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

  return (
    <IngredientEditor
      style={styles.container}
      ingredient={ingredient}
      onDiscard={() => navigation.goBack()}
      onAfterSave={() => navigation.push('IngredientHome')}
      onAfterDelete={() => navigation.push('IngredientHome')}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: appTheme.gaps.medium,
  },
});
