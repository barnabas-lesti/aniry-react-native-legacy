import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppStackScreenProps } from 'app/models';
import { AppButton } from 'app/components';
import { appTheme } from 'app/theme';
import { ingredientService } from '../services';
import { IngredientStackParamList, Ingredient } from '../models';
import { IngredientTable } from '../components';

type IngredientHomeScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientHome'>;

export function IngredientHomeScreen(props: IngredientHomeScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  async function fetchIngredients() {
    setIsLoading(true);
    setIngredients(await ingredientService.fetchIngredients());
    setIsLoading(false);
  }

  function selectIngredient(ingredient: Ingredient) {
    navigation.push('IngredientEdit', { ingredient });
  }

  async function onSearchHandler(searchString: string) {
    setIngredients(await ingredientService.fetchIngredients(searchString));
  }

  return (
    <View style={styles.container}>
      <AppButton
        style={styles.newIngredientButton}
        type="primary"
        label={t('ingredient.ingredientHomeScreen.createIngredient')}
        onPress={() => navigation.push('IngredientCreate')}
      />

      <IngredientTable
        ingredients={ingredients}
        isLoading={isLoading}
        onSelectIngredient={selectIngredient}
        onSearch={onSearchHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: appTheme.gaps.medium,
  },
  newIngredientButton: {
    marginBottom: appTheme.gaps.medium,
  },
});
