import React, { useEffect } from 'react';

import { AppItemList } from 'app/components';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { appState } from 'app/state';
import { Ingredient } from '../models';
import { ingredientState } from '../state';

interface IngredientListProps {
  /**
   * Selected ingredients.
   */
  selectedIngredients?: Ingredient[];

  /**
   * Ingredient select event handler.
   */
  onSelect: (ingredient: Ingredient) => void;
}

/**
 * Ingredient list component.
 */
export function IngredientList(props: IngredientListProps) {
  const { selectedIngredients = [], onSelect } = props;

  const dispatch = useAppDispatch();
  const isLoading = appState.selectors.isLoading(useAppSelector((state) => state.app));
  const ingredientStateData = useAppSelector(({ ingredient }) => ingredient);
  const ingredients = ingredientState.selectors.searchStringFilteredIngredients(ingredientStateData);

  useEffect(() => {
    dispatch(ingredientState.asyncActions.loadIngredients());
  }, [dispatch]);

  async function onSearch(searchString: string) {
    dispatch(ingredientState.actions.setSearchString(searchString));
  }

  return (
    <AppItemList
      items={ingredients}
      initialSearchString={ingredientStateData.searchString}
      selectedItems={selectedIngredients}
      noItemsTextKey={isLoading ? '' : 'ingredient.ingredientItemList.noItems'}
      onSearch={onSearch}
      onSelect={onSelect}
    />
  );
}
