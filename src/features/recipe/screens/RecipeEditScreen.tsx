import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

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

  function onAfterSave() {
    navigation.push('RecipeHome');
  }

  function onAfterDelete() {
    navigation.push('RecipeHome');
  }

  function onDiscard() {
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <RecipeEditor
        recipe={recipe}
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
