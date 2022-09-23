import React from 'react';
import { StyleSheet } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { appTheme } from 'app/theme';
import { RecipeStackParamList } from '../models';
import { RecipeEditor } from '../components';

type RecipeEditScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeEdit'>;

/**
 * Recipe editing screen.
 */
export function RecipeEditScreen(props: RecipeEditScreenProps) {
  const {
    navigation,
    route: {
      params: { recipe },
    },
  } = props;

  return (
    <RecipeEditor
      style={styles.container}
      recipe={recipe}
      onDiscard={() => navigation.goBack()}
      onAfterSave={() => navigation.push('RecipeHome')}
      onAfterDelete={() => navigation.push('RecipeHome')}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: appTheme.gaps.medium,
    paddingBottom: -appTheme.gaps.medium,
  },
});
