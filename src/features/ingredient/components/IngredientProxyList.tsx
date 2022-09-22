import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, ScrollView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'react-native-paper';

import { appTheme } from 'app/theme';
import { IngredientProxy } from '../models';

interface IngredientProxyListProps {
  /**
   * Ingredient proxies to display.
   */
  ingredientProxies: IngredientProxy[];

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Ingredient proxy select event handler.
   */
  onSelectIngredientProxy?: (ingredientProxy: IngredientProxy) => void;
}

/**
 * Ingredient list component.
 */
export function IngredientProxyList(props: IngredientProxyListProps) {
  const { ingredientProxies, style, onSelectIngredientProxy } = props;

  const { t } = useTranslation();

  return (
    <ScrollView style={[styles.container, style]}>
      {!ingredientProxies.length ? (
        <Text style={styles.noItems}>{t('ingredient.ingredientProxyList.noItems')}</Text>
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{t('app.labels.name')}</DataTable.Title>
            <DataTable.Title numeric>{t('app.labels.calories')}</DataTable.Title>
            <DataTable.Title numeric>{t('app.labels.serving')}</DataTable.Title>
          </DataTable.Header>

          {ingredientProxies.map((ingredientProxy) => {
            const { serving, nutrients, ingredient } = ingredientProxy;
            return (
              <DataTable.Row
                key={ingredient.id}
                onPress={() => onSelectIngredientProxy && onSelectIngredientProxy(ingredientProxy)}
              >
                <DataTable.Cell>{ingredient.name}</DataTable.Cell>
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
