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
        onSelectItem={(ingredient) => navigation.push('IngredientEdit', { ingredient })}
        onSearch={async (searchString) => dispatch(ingredientState.actions.setIngredientHomeSearchString(searchString))}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  newIngredientButton: {
    marginBottom: appTheme.gaps.medium,
  },
});
