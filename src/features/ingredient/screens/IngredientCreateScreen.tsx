import React from 'react';
import { StyleSheet } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { appTheme } from 'app/theme';
import { IngredientStackParamList } from '../models';
import { IngredientEditor } from '../components';

type IngredientCreateScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientCreate'>;

/**
 * Ingredient create screen.
 */
export function IngredientCreateScreen(props: IngredientCreateScreenProps) {
  const { navigation } = props;

  return (
    <IngredientEditor
      style={styles.container}
      onDiscard={() => navigation.goBack()}
      onAfterSave={() => navigation.push('IngredientHome')}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: appTheme.gaps.medium,
  },
});
