import React, { useEffect } from 'react';

import { AppItemList } from 'app/components';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { appState } from 'app/state';
import { Recipe } from '../models';
import { recipeState } from '../state';

interface RecipeListProps {
  /**
   * Recipe select event handler.
   */
  onSelect: (recipe: Recipe) => void;
}

/**
 * Recipe list component.
 */
export function RecipeList(props: RecipeListProps) {
  const { onSelect } = props;

  const dispatch = useAppDispatch();
  const isLoading = appState.selectors.isLoading(useAppSelector((state) => state.app));
  const recipeStateData = useAppSelector(({ recipe }) => recipe);
  const recipes = recipeState.selectors.searchStringFilteredRecipes(recipeStateData);

  useEffect(() => {
    dispatch(recipeState.asyncActions.lazyLoadAllRecipes());
  }, [dispatch]);

  async function onSearch(searchString: string) {
    dispatch(recipeState.actions.setSearchString(searchString));
  }

  return (
    <AppItemList
      items={recipes}
      initialSearchString={recipeStateData.searchString}
      noItemsTextKey={isLoading ? '' : 'recipe.recipeItemList.noItems'}
      onSearch={onSearch}
      onSelect={onSelect}
    />
  );
}
