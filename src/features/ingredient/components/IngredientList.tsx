import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, ScrollView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'react-native-paper';

import { appTheme } from 'app/theme';
import { Ingredient } from '../models';

interface IngredientListProps {
  /**
   * Ingredients to display.
   */
  ingredients: Ingredient[];

  /**
   * Selected ingredients.
   */
  selectedIngredients?: Ingredient[];

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Ingredient select event handler.
   */
  onSelectIngredient?: (ingredient: Ingredient) => void;
}

/**
 * Ingredient list component.
 */
export function IngredientList(props: IngredientListProps) {
  const { ingredients, selectedIngredients = [], style, onSelectIngredient } = props;

  const { t } = useTranslation();

  function isIngredientSelected(ingredient: Ingredient) {
    return !!selectedIngredients.filter(({ id }) => ingredient.id === id).length;
  }

  return (
    <ScrollView style={[styles.container, style]}>
      {!ingredients.length ? (
        <Text style={styles.noItems}>{t('ingredient.ingredientList.noItems')}</Text>
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{t('app.labels.name')}</DataTable.Title>
            <DataTable.Title numeric>{t('app.labels.calories')}</DataTable.Title>
            <DataTable.Title numeric>{t('app.labels.serving')}</DataTable.Title>
          </DataTable.Header>

          {ingredients.map((ingredient) => {
            const { id, name, nutrients, serving } = ingredient;
            return (
              <DataTable.Row
                style={[isIngredientSelected(ingredient) && styles.selectedRow]}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedRow: {
    backgroundColor: appTheme.colors.tableRowSelected,
  },
  noItems: {
    marginTop: appTheme.gaps.medium,
    textAlign: 'center',
  },
});
