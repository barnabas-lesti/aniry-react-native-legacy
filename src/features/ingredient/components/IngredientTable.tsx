import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'react-native-paper';

import { AppSearchBar, AppLoader } from 'app/components';
import { appTheme } from 'app/theme';
import { Ingredient } from '../models';
import { ingredientService } from '../services';

interface IngredientTableProps {
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
export function IngredientTable(props: IngredientTableProps) {
  const { style, onSelectIngredient } = props;

  const initialSearchString = '';

  const { t } = useTranslation();
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadIngredients(initialSearchString);
  }, []);

  async function onSearch(searchString: string) {
    await loadIngredients(searchString);
  }

  async function loadIngredients(searchString: string) {
    setIsLoading(true);
    setIngredients(await ingredientService.getIngredients(searchString));
    setIsLoading(false);
  }

  return (
    <View style={style}>
      <AppSearchBar
        style={styles.searchInput}
        initialValue={initialSearchString}
        placeholder={t('ingredient.ingredientTable.searchPlaceholder')}
        onSearch={onSearch}
      />

      {isLoading ? (
        <AppLoader style={styles.loader} />
      ) : ingredients.length < 1 ? (
        <Text style={styles.noItemsText}>{t('ingredient.ingredientTable.noItems')}</Text>
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
    marginBottom: appTheme.gaps.small,
  },
  loader: {
    marginTop: appTheme.gaps.medium,
  },
  noItemsText: {
    marginTop: appTheme.gaps.medium,
    textAlign: 'center',
  },
});
