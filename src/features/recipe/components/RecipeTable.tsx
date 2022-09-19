import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'react-native-paper';

import { AppSearchBar, AppLoader } from 'app/components';
import { appTheme } from 'app/theme';
import { Recipe } from '../models';
import { recipeService } from '../services';

interface RecipeTableProps {
  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Recipe select event handler.
   */
  onSelectRecipe?: (recipe: Recipe) => void;
}

/**
 * Recipe list component.
 */
export function RecipeTable(props: RecipeTableProps) {
  const { style, onSelectRecipe } = props;

  const initialSearchString = '';

  const { t } = useTranslation();
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadRecipes(initialSearchString);
  }, []);

  async function onSearch(searchString: string) {
    await loadRecipes(searchString);
  }

  async function loadRecipes(searchString: string) {
    setIsLoading(true);
    setRecipes(await recipeService.getRecipes(searchString));
    setIsLoading(false);
  }

  return (
    <View style={style}>
      <AppSearchBar
        style={styles.searchInput}
        initialValue={initialSearchString}
        placeholder={t('recipe.recipeTable.searchPlaceholder')}
        onSearch={onSearch}
      />

      {isLoading ? (
        <AppLoader style={styles.loader} />
      ) : recipes.length < 1 ? (
        <Text style={styles.noItemsText}>{t('recipe.recipeTable.noItems')}</Text>
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{t('app.labels.name')}</DataTable.Title>
            <DataTable.Title numeric>{t('app.labels.serving')}</DataTable.Title>
          </DataTable.Header>

          {recipes.map((recipe) => {
            const { id, name, serving } = recipe;
            return (
              <DataTable.Row
                key={id}
                onPress={() => onSelectRecipe && onSelectRecipe(recipe)}
              >
                <DataTable.Cell>{name}</DataTable.Cell>
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
