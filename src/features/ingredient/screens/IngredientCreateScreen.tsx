import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { AppStackScreenProps } from 'app/models';
import { IngredientStackParamList } from '../models';
import { IngredientEditor } from '../components';

type IngredientCreateScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientCreate'>;

export function IngredientCreateScreen(props: IngredientCreateScreenProps) {
  const { navigation } = props;

  async function onAfterSave() {
    navigation.push('IngredientHome');
  }

  function onDiscard() {
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <IngredientEditor
        onDiscard={onDiscard}
        onAfterSave={onAfterSave}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
  },
});
