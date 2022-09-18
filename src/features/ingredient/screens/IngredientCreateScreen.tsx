import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { appTheme } from 'app/theme';
import { IngredientStackParamList } from '../models';
import { IngredientEditor } from '../components';

type IngredientCreateScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientCreate'>;

export function IngredientCreateScreen(props: IngredientCreateScreenProps) {
  const { navigation } = props;

  function onAfterSave() {
    navigation.push('IngredientHome');
  }

  function onDiscard() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <IngredientEditor
        onDiscard={onDiscard}
        onAfterSave={onAfterSave}
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
