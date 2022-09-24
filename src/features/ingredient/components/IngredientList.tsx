import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { AppItemList } from 'app/components';
import { appCommonService } from 'app/services';
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

  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);

  useEffect(() => {
    fetchIngredients('');
  }, []);

  async function onSearch(searchString: string) {
    await fetchIngredients(searchString);
  }

  async function fetchIngredients(searchString: string) {
    appCommonService.startLoading();
    setIngredients(await ingredientService.getIngredients(searchString));
    appCommonService.stopLoading();
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
