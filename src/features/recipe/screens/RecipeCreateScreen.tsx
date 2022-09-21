import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { appTheme } from 'app/theme';
import { RecipeStackParamList } from '../models';
import { RecipeEditor } from '../components';

type RecipeCreateScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeCreate'>;

export function RecipeCreateScreen(props: RecipeCreateScreenProps) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <RecipeEditor
        onDiscard={() => navigation.goBack()}
        onAfterSave={() => navigation.push('RecipeHome')}
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
