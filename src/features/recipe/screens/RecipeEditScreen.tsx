import React from 'react';
import { StyleSheet, View } from 'react-native';

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
    <View style={styles.container}>
      <RecipeEditor
        recipe={recipe}
        onDiscard={() => navigation.goBack()}
        onAfterSave={() => navigation.push('RecipeHome')}
        onAfterDelete={() => navigation.push('RecipeHome')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: appTheme.gaps.medium,
    flex: 1,
  },
});
