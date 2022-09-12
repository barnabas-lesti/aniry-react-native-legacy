import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTranslation } from 'src/i18n/hooks';
import { useAppNavigation } from 'src/navigation/hooks';
import { CommonButton } from '../common';

export function IngredientsScreen() {
  const navigation = useAppNavigation<'Ingredients'>();
  const { t } = useAppTranslation();

  return (
    <View style={styles.container}>
      <CommonButton
        style={styles.newIngredientButton}
        label={t('ingredients.newIngredient')}
        onPress={() => navigation.navigate('EditIngredient')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
  },
  newIngredientButton: {},
});
