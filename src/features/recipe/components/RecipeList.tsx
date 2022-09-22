import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, ScrollView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'react-native-paper';

import { appTheme } from 'app/theme';
import { Recipe } from '../models';

interface RecipeListProps {
  /**
   * Recipes to display.
   */
  recipes: Recipe[];

  /**
   * Selected recipes.
   */
  selectedRecipes?: Recipe[];

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
export function RecipeList(props: RecipeListProps) {
  const { recipes, selectedRecipes = [], style, onSelectRecipe } = props;

  const { t } = useTranslation();

  function isRecipeSelected(recipe: Recipe) {
    return !!selectedRecipes.filter(({ id }) => recipe.id === id).length;
  }

  return (
    <ScrollView style={[styles.container, style]}>
      {!recipes.length ? (
        <Text style={styles.noItems}>{t('recipe.recipeList.noItems')}</Text>
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{t('app.labels.name')}</DataTable.Title>
            <DataTable.Title numeric>{t('app.labels.calories')}</DataTable.Title>
            <DataTable.Title numeric>{t('app.labels.serving')}</DataTable.Title>
          </DataTable.Header>

          {recipes.map((recipe) => {
            const { id, name, serving, nutrients } = recipe;
            return (
              <DataTable.Row
                style={[isRecipeSelected(recipe) && styles.selectedRow]}
                key={id}
                onPress={() => onSelectRecipe && onSelectRecipe(recipe)}
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
