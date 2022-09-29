import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppStackScreenProps } from 'app/models';
import { AppButton, AppItemList, AppScreen } from 'app/components';
import { appTheme } from 'app/theme';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { appState } from 'app/state';
import { Ingredient, IngredientStackParamList } from '../models';
import { ingredientState } from '../state';

type IngredientHomeScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientHome'>;

export function IngredientHomeScreen(props: IngredientHomeScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isLoading = appState.selectors.isLoading(useAppSelector((state) => state.app));
  const ingredientStateData = useAppSelector(({ ingredient }) => ingredient);
  const ingredients = ingredientState.selectors.ingredientHomeIngredients(ingredientStateData);

  useEffect(() => {
    dispatch(ingredientState.asyncActions.lazyLoadIngredients());
  }, [dispatch]);

  async function onSearch(searchString: string) {
    dispatch(ingredientState.actions.setIngredientHomeSearchString(searchString));
  }

  function onSelect(ingredient: Ingredient) {
    navigation.push('IngredientEdit', { ingredient });
  }

  return (
    <AppScreen>
      <AppButton
        style={styles.newIngredientButton}
        backgroundColor={appTheme.colors.ingredientPrimary}
        label={t('ingredient.ingredientHomeScreen.createIngredient')}
        onPress={() => navigation.push('IngredientCreate')}
      />

      <AppItemList
        items={ingredients}
        initialSearchString={ingredientStateData.ingredientHomeSearchString}
        noItemsTextKey={isLoading ? '' : 'ingredient.ingredientHomeScreen.noIngredients'}
        onSearch={onSearch}
        onSelect={onSelect}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  newIngredientButton: {
    marginBottom: appTheme.gaps.medium,
  },
});
