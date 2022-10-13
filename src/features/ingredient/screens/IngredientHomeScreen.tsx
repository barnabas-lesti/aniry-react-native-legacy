import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppStackScreenProps } from 'app/models';
import { AppButton, AppList, AppLayoutScreen } from 'app/components';
import { appStyles, appTheme } from 'app/theme';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { Ingredient, IngredientStackParamList } from '../models';
import { ingredientState } from '../state';

type IngredientHomeScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientHome'>;

export function IngredientHomeScreen(props: IngredientHomeScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
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

  async function onRefresh() {
    await dispatch(ingredientState.asyncActions.loadIngredients());
  }

  return (
    <AppLayoutScreen titleKey="ingredient.ingredientHomeScreen.title">
      <View style={appStyles.section}>
        <AppButton
          style={appStyles.sectionRow}
          backgroundColor={appTheme.colors.ingredientPrimary}
          label={t('ingredient.ingredientHomeScreen.createIngredient')}
          onPress={() => navigation.push('IngredientCreate')}
        />
      </View>

      <View style={[appStyles.section, appStyles.flex]}>
        <AppList
          sortByName
          style={appStyles.sectionRow}
          items={ingredients}
          initialSearchString={ingredientStateData.ingredientHomeSearchString}
          noItemsTextKey={'ingredient.ingredientHomeScreen.noIngredients'}
          onSearch={onSearch}
          onSelect={onSelect}
          onRefresh={onRefresh}
        />
      </View>
    </AppLayoutScreen>
  );
}
