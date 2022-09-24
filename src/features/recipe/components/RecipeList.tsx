import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { AppItemList } from 'app/components';
import { appCommonService } from 'app/services';
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

  const [recipes, setRecipes] = useState<Array<Recipe>>([]);

  useEffect(() => {
    fetchRecipes('');
  }, []);

  async function onSearch(searchString: string) {
    await fetchRecipes(searchString);
  }

  async function fetchRecipes(searchString: string) {
    appCommonService.startLoading();
    setRecipes(await recipeService.getRecipes(searchString));
    appCommonService.stopLoading();
  }

  return (
    <AppItemList
      style={style}
      items={recipes}
      selectedItems={selectedRecipes}
      onSelectItem={onSelectRecipe}
      onSearch={onSearch}
    />
  );
}
