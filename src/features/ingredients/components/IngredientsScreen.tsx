import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTranslation, useAppNavigation } from 'app/hooks';
import { AppButton } from 'app/components';

export function IngredientsScreen() {
  const navigation = useAppNavigation<'Ingredients'>();
  const { t } = useAppTranslation();

  return (
    <View style={styles.container}>
      <AppButton
        style={styles.newIngredientButton}
        label={t('ingredients.ingredientsScreen.newIngredient')}
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
