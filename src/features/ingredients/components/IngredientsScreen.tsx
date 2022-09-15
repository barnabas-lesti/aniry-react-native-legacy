import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { AppButton } from 'app/components';
import { AppStackParamList } from 'app/models';
import { ingredientsService } from '../services';
import { Ingredient } from '../models';

type IngredientsScreenProps = NativeStackScreenProps<AppStackParamList, 'Ingredients'>;

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

  function onIngredientSelect(ingredient: Ingredient) {
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

      <FlatList
        style={styles.list}
        data={ingredients}
        renderItem={({ item: ingredient }) => (
          <TouchableOpacity
            style={styles.listItem}
            key={ingredient.id}
            onPress={() => onIngredientSelect(ingredient)}
          >
            <Text>{ingredient.name}</Text>
            <Text>
              {ingredient.serving.value} {ingredient.serving.unit}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
  },
  newIngredientButton: {
    marginBottom: 28,
  },
  list: {},
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 8,
    padding: 8,
  },
});
