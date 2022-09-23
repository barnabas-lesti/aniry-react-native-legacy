import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppItemList } from 'app/components';
import { Recipe } from '../models';
import { recipeService } from '../services';

interface RecipeListProps {
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
  const { selectedRecipes = [], style, onSelectRecipe } = props;

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);

  useEffect(() => {
    fetchRecipes('');
  }, []);

  async function onSearch(searchString: string) {
    await fetchRecipes(searchString);
  }

  async function fetchRecipes(searchString: string) {
    setIsLoading(true);
    setRecipes(await recipeService.getRecipes(searchString));
    setIsLoading(false);
  }

  return (
    <AppItemList
      style={style}
      items={recipes}
      selectedItems={selectedRecipes}
      noItemsText={t('recipe.recipeList.noItems')}
      isLoading={isLoading}
      onSelectItem={onSelectRecipe}
      onSearch={onSearch}
    />
  );
}
