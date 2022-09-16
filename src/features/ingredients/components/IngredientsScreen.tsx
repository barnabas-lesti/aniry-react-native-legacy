import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppStackParamList, AppStackScreenProps } from 'app/navigation';
import { AppButton } from 'app/components';
import { ingredientsService } from '../services';
import { Ingredient } from '../models';
import { IngredientList } from './IngredientList';

type IngredientsScreenProps = AppStackScreenProps<AppStackParamList, 'Ingredients'>;

/**
 * Ingredients screen component.
 */
export function IngredientsScreen(props: IngredientsScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();

  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  async function fetchIngredients() {
    const loadedIngredients = await ingredientsService.fetchIngredients();
    setIngredients(ingredientsService.sortIngredientsByName(loadedIngredients));
  }

  function selectIngredient(ingredient: Ingredient) {
    navigation.push('EditIngredient', { ingredient });
  }

  return (
    <View style={styles.container}>
      <AppButton
        style={styles.newIngredientButton}
        type="primary"
        label={t('ingredients.ingredientsScreen.newIngredient')}
        onPress={() => navigation.push('EditIngredient')}
      />

      <IngredientList
        ingredients={ingredients}
        onSelectIngredient={selectIngredient}
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
