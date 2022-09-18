import React, { useState } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'react-native-paper';

import { AppSearchBar, AppLoader } from 'app/components';
import { Ingredient } from '../models';

interface IngredientTableProps {
  /**
   * Ingredients to display.
   */
  ingredients: Array<Ingredient>;

  /**
   * Initial search string.
   */
  searchString?: string;

  /**
   * Loading state indicator.
   */
  isLoading?: boolean;

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
export function IngredientTable(props: IngredientTableProps) {
  const { ingredients, searchString, style, isLoading, onSearch, onSelectIngredient } = props;

  const { t } = useTranslation();
  const [localSearchString, setLocalSearchString] = useState(searchString || '');

  return (
    <View style={style}>
      {onSearch && (
        <AppSearchBar
          style={styles.searchInput}
          placeholder={t('ingredient.ingredientTable.searchPlaceholder')}
          value={localSearchString}
          onChangeValue={setLocalSearchString}
          onThrottledChangeValue={onSearch}
        />
      )}

      {isLoading ? (
        <AppLoader style={styles.loader} />
      ) : ingredients.length < 1 ? (
        <Text style={styles.noItemsText}>{t('ingredient.ingredientTable.noItems')}</Text>
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{t('ingredient.ingredientTable.name')}</DataTable.Title>
            <DataTable.Title numeric>{t('ingredient.ingredientTable.calories')}</DataTable.Title>
            <DataTable.Title numeric>{t('ingredient.ingredientTable.serving')}</DataTable.Title>
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  noItemsText: {
    marginTop: 20,
    textAlign: 'center',
  },
});
