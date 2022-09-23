import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppItemList } from 'app/components';
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

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);

  useEffect(() => {
    fetchIngredients('');
  }, []);

  async function onSearch(searchString: string) {
    await fetchIngredients(searchString);
  }

  async function fetchIngredients(searchString: string) {
    setIsLoading(true);
    setIngredients(await ingredientService.getIngredients(searchString));
    setIsLoading(false);
  }

  return (
    <AppItemList
      style={style}
      items={ingredients}
      selectedItems={selectedIngredients}
      noItemsText={t('ingredient.ingredientList.noItems')}
      isLoading={isLoading}
      onSelectItem={onSelectIngredient}
      onSearch={onSearch}
    />
  );
}
