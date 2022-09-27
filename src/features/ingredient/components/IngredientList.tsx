import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { AppItemList } from 'app/components';
import { useAppDispatch } from 'app/store/hooks';
import { appStateActions } from 'app/store';
import { Ingredient } from '../models';
import { ingredientService } from '../services';

interface IngredientListProps {
  /**
   * Selected ingredients.
   */
  selectedIngredients?: Ingredient[];

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Ingredient select event handler.
   */
  onSelectIngredient?: (ingredient: Ingredient) => void;
}

/**
 * Ingredient list component.
 */
export function IngredientList(props: IngredientListProps) {
  const { selectedIngredients = [], style, onSelectIngredient } = props;

  const dispatch = useAppDispatch();

  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);

  useEffect(() => {
    fetchIngredients('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSearch(searchString: string) {
    await fetchIngredients(searchString);
  }

  async function fetchIngredients(searchString: string) {
    dispatch(appStateActions.startLoading());
    setIngredients(await ingredientService.getMany(searchString));
    dispatch(appStateActions.stopLoading());
  }

  return (
    <AppItemList
      style={style}
      items={ingredients}
      selectedItems={selectedIngredients}
      onSelectItem={onSelectIngredient}
      onSearch={onSearch}
    />
  );
}
