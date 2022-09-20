import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { IngredientProxy } from 'features/ingredient/models';

interface RecipeIngredientProxyListProps {
  ingredientProxies: IngredientProxy[];

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;
}

export function RecipeIngredientProxyList(props: RecipeIngredientProxyListProps) {
  const { ingredientProxies } = props;

  const { t } = useTranslation();

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>{t('app.labels.name')}</DataTable.Title>
        <DataTable.Title numeric>{t('app.labels.serving')}</DataTable.Title>
      </DataTable.Header>

      {ingredientProxies.map((ingredientProxy) => {
        const { ingredient, serving } = ingredientProxy;
        return (
          <DataTable.Row key={ingredient.id}>
            <DataTable.Cell>{ingredient.name}</DataTable.Cell>
            <DataTable.Cell numeric>{`${serving.value} ${serving.unit}`}</DataTable.Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
}
