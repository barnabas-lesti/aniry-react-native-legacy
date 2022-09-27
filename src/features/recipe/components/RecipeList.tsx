import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { AppItemList } from 'app/components';
import { useAppDispatch } from 'app/store/hooks';
import { appStateActions } from 'app/state';
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

  const dispatch = useAppDispatch();

  const [recipes, setRecipes] = useState<Array<Recipe>>([]);

  useEffect(() => {
    fetchRecipes('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSearch(searchString: string) {
    await fetchRecipes(searchString);
  }

  async function fetchRecipes(searchString: string) {
    dispatch(appStateActions.startLoading());
    setRecipes(await recipeService.getMany(searchString));
    dispatch(appStateActions.stopLoading());
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
