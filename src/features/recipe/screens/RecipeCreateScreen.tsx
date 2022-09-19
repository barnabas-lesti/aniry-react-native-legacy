import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { appTheme } from 'app/theme';
import { RecipeStackParamList } from '../models';

type RecipeCreateScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeCreate'>;

export function RecipeCreateScreen(props: RecipeCreateScreenProps) {
  const { navigation } = props;

  function onAfterSave() {
    navigation.push('RecipeHome');
  }

  function onDiscard() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text>RecipeCreateScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: appTheme.gaps.medium,
    flex: 1,
  },
});
