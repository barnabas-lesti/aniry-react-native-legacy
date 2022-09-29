import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppStackScreenProps } from 'app/models';
import { AppButton, AppItemList, AppScreen } from 'app/components';
import { appTheme } from 'app/theme';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { Recipe, RecipeStackParamList } from '../models';
import { recipeState } from '../state';

type RecipeHomeScreenProps = AppStackScreenProps<RecipeStackParamList, 'RecipeHome'>;

export function RecipeHomeScreen(props: RecipeHomeScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const recipeStateData = useAppSelector(({ recipe }) => recipe);
  const recipes = recipeState.selectors.recipeHomeRecipes(recipeStateData);

  useEffect(() => {
    dispatch(recipeState.asyncActions.lazyLoadRecipes());
  }, [dispatch]);

  async function onSearch(searchString: string) {
    dispatch(recipeState.actions.setRecipeHomeSearchString(searchString));
  }

  function onSelect(recipe: Recipe) {
    navigation.push('RecipeEdit', { recipe });
  }

  async function onRefresh() {
    await dispatch(recipeState.asyncActions.loadRecipes());
  }

  return (
    <AppScreen>
      <AppButton
        style={styles.newRecipeButton}
        backgroundColor={appTheme.colors.recipePrimary}
        label={t('recipe.recipeHomeScreen.createRecipe')}
        onPress={() => navigation.push('RecipeCreate')}
      />

      <AppItemList
        items={recipes}
        initialSearchString={recipeStateData.recipeHomeSearchString}
        noItemsTextKey={'recipe.recipeHomeScreen.noRecipes'}
        onSearch={onSearch}
        onSelect={onSelect}
        onRefresh={onRefresh}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  newRecipeButton: {
    marginBottom: appTheme.gaps.medium,
  },
});
