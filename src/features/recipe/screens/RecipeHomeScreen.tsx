import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

import { appTheme } from 'app/theme';
import { AppStackScreenProps } from 'app/models';
import { RecipeStackParamList } from '../models';

type RecipeHomeScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeHome'>;

export function RecipeHomeScreen(props: RecipeHomeScreenProps) {
  const { navigation } = props;

  return (
    <ScrollView style={styles.container}>
      <Text>RecipeHomeScreen</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: appTheme.gaps.medium,
    flex: 1,
  },
});
