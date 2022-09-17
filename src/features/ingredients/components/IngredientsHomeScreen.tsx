import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppStackScreenProps } from 'app/navigation';
import { AppButton } from 'app/components';
import { ingredientsService } from '../services';
import { IngredientsStackParamList, Ingredient } from '../models';
import { IngredientsTable } from './IngredientsTable';

type IngredientsHomeScreenProps = AppStackScreenProps<IngredientsStackParamList, 'IngredientsHome'>;

export function IngredientsHomeScreen(props: IngredientsHomeScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();

  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  async function fetchIngredients() {
    setIngredients(await ingredientsService.fetchIngredients());
  }

  function selectIngredient(ingredient: Ingredient) {
    navigation.push('EditIngredient', { ingredient });
  }

  async function onSearchHandler(searchString: string) {
    setIngredients(await ingredientsService.fetchIngredients(searchString));
  }

  return (
    <View style={styles.container}>
      <AppButton
        style={styles.newIngredientButton}
        type="primary"
        label={t('ingredients.ingredientsHomeScreen.createIngredient')}
        onPress={() => navigation.navigate('CreateIngredient')}
      />

      <IngredientsTable
        ingredients={ingredients}
        onSelectIngredient={selectIngredient}
        onSearch={onSearchHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
  },
  newIngredientButton: {
    marginBottom: 20,
  },
});
