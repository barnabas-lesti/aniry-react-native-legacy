import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppStackScreenProps } from 'app/models';
import { AppButton, AppItemList, AppScreen } from 'app/components';
import { appTheme } from 'app/theme';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { Ingredient, IngredientStackParamList } from '../models';
import { ingredientState } from '../state';

type IngredientHomeScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientHome'>;

export function IngredientHomeScreen(props: IngredientHomeScreenProps) {
  const { navigation } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const ingredientStateData = useAppSelector(({ ingredient }) => ingredient);
  const ingredients = ingredientState.selectors
    .ingredientHomeIngredients(ingredientStateData)
    .map((ingredient) => new Ingredient(ingredient));

  useEffect(() => {
    dispatch(ingredientState.asyncActions.loadIngredients());
  }, [dispatch]);

  function onNewIngredientPress() {
    navigation.push('IngredientCreate');
  }

  function onSelectItem(ingredient: Ingredient) {
    navigation.push('IngredientEdit', { ingredient });
  }

  async function onSearch(searchString: string) {
    await dispatch(ingredientState.actions.setIngredientHomeSearchString(searchString));
  }

  return (
    <AppScreen>
      <AppButton
        style={styles.newIngredientButton}
        backgroundColor={appTheme.colors.ingredientPrimary}
        label={t('ingredient.ingredientHomeScreen.createIngredient')}
        onPress={onNewIngredientPress}
      />

      <AppItemList
        items={ingredients}
        initialSearchString={ingredientStateData.ingredientHomeSearchString}
        onSearch={onSearch}
        onSelectItem={onSelectItem}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  newIngredientButton: {
    marginBottom: appTheme.gaps.medium,
  },
});
