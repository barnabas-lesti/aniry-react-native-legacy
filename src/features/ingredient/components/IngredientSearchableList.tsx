import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppSearchBar, AppLoader } from 'app/components';
import { appTheme } from 'app/theme';
import { Ingredient } from '../models';
import { ingredientService } from '../services';
import { IngredientList } from './IngredientList';

interface IngredientSearchableListProps {
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
 * Ingredient searchable list component.
 */
export function IngredientSearchableList(props: IngredientSearchableListProps) {
  const { selectedIngredients = [], style, onSelectIngredient } = props;

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);

  useEffect(() => {
    loadIngredients('');
  }, []);

  async function onSearch(searchString: string) {
    await loadIngredients(searchString);
  }

  async function loadIngredients(searchString: string) {
    setIsLoading(true);
    setIngredients(await ingredientService.getIngredients(searchString));
    setIsLoading(false);
  }

  return (
    <View style={[styles.container, style]}>
      <AppSearchBar
        style={styles.searchInput}
        placeholder={t('ingredient.ingredientSearchableList.placeholder')}
        onSearch={onSearch}
      />

      {isLoading ? (
        <AppLoader style={styles.loader} />
      ) : (
        <IngredientList
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
          onSelectIngredient={onSelectIngredient}
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
