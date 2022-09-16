import React, { useState } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'react-native-paper';

import { AppTextInput } from 'app/components';
import { Ingredient } from '../models';

interface IngredientsTableProps {
  /**
   * Ingredients to display.
   */
  ingredients: Array<Ingredient>;

  /**
   * Initial search string.
   */
  searchString?: string;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Search event handler.
   */
  onSearch?: (searchString: string) => void;

  /**
   * Ingredient select event handler.
   */
  onSelectIngredient?: (ingredient: Ingredient) => void;
}

/**
 * Ingredient list component.
 */
export function IngredientsTable(props: IngredientsTableProps) {
  const { ingredients, searchString, style, onSearch, onSelectIngredient } = props;

  const { t } = useTranslation();
  const [localSearchString, setLocalSearchString] = useState(searchString || '');

  return (
    <View style={style}>
      {onSearch && (
        <AppTextInput
          style={styles.searchInput}
          placeholder={t('ingredients.ingredientsTable.searchPlaceholder')}
          value={localSearchString}
          onChangeValue={setLocalSearchString}
          onThrottledChangeValue={onSearch}
        />
      )}

      {ingredients.length > 0 ? (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{t('ingredients.ingredientsTable.name')}</DataTable.Title>
            <DataTable.Title numeric>{t('ingredients.ingredientsTable.calories')}</DataTable.Title>
            <DataTable.Title numeric>{t('ingredients.ingredientsTable.serving')}</DataTable.Title>
          </DataTable.Header>

          {ingredients.map((ingredient) => {
            const { id, name, nutrients, serving } = ingredient;
            return (
              <DataTable.Row
                key={id}
                onPress={() => onSelectIngredient && onSelectIngredient(ingredient)}
              >
                <DataTable.Cell>{name}</DataTable.Cell>
                <DataTable.Cell numeric>{`${nutrients.calories} ${t('app.units.kcal')}`}</DataTable.Cell>
                <DataTable.Cell numeric>{`${serving.value} ${serving.unit}`}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      ) : (
        <Text style={styles.noItemsText}>{t('ingredients.ingredientsTable.noItems')}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    marginBottom: 10,
  },
  noItemsText: {
    textAlign: 'center',
  },
});
