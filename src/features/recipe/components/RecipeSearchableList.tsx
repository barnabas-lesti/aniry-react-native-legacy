import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppSearchBar, AppLoader } from 'app/components';
import { appTheme } from 'app/theme';
import { Recipe } from '../models';
import { recipeService } from '../services';
import { RecipeList } from './RecipeList';

interface RecipeSearchableListProps {
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
 * Recipe searchable list component.
 */
export function RecipeSearchableList(props: RecipeSearchableListProps) {
  const { selectedRecipes = [], style, onSelectRecipe } = props;

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);

  useEffect(() => {
    loadRecipes('');
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
    <View style={[styles.container, style]}>
      <AppSearchBar
        style={styles.searchInput}
        placeholder={t('recipe.recipeSearchableList.placeholder')}
        onSearch={onSearch}
      />

      {isLoading ? (
        <AppLoader style={styles.loader} />
      ) : (
        <RecipeList
          recipes={recipes}
          selectedRecipes={selectedRecipes}
          onSelectRecipe={onSelectRecipe}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    marginBottom: appTheme.gaps.small,
  },
  loader: {
    marginTop: appTheme.gaps.medium,
  },
});
