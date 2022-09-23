import React from 'react';
import { StyleSheet } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { appTheme } from 'app/theme';
import { RecipeStackParamList } from '../models';
import { RecipeEditor } from '../components';

type RecipeCreateScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeCreate'>;

export function RecipeCreateScreen(props: RecipeCreateScreenProps) {
  const { navigation } = props;

  return (
    <RecipeEditor
      style={styles.container}
      onDiscard={() => navigation.goBack()}
      onAfterSave={() => navigation.push('RecipeHome')}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: appTheme.gaps.medium,
    paddingBottom: -appTheme.gaps.medium,
  },
});
