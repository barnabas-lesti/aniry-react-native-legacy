import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Ingredient } from '../models';

interface IngredientListProps {
  /**
   * Ingredients to display.
   */
  ingredients: Array<Ingredient>;

  searchString?: string;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  onChangeSearchString?: (newSearchString: string) => void;

  onSelectIngredient?: (ingredient: Ingredient) => void;
}

/**
 * Ingredient list component.
 */
export function IngredientList(props: IngredientListProps) {
  const { ingredients, style, onSelectIngredient } = props;

  const { t } = useTranslation();

  return (
    <View style={style}>
      {ingredients.length < 1 && <Text style={styles.noItemsText}>{t('ingredients.ingredientList.noItemsText')}</Text>}

      <FlatList
        data={ingredients}
        renderItem={({ item: ingredient }) => (
          <TouchableOpacity
            style={styles.listItem}
            key={ingredient.id}
            onPress={() => onSelectIngredient && onSelectIngredient(ingredient)}
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
  noItemsText: {
    textAlign: 'center',
  },
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
