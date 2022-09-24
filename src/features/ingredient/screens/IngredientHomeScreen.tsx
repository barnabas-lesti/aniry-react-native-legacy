import React from 'react';
import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { AppStackScreenProps } from 'app/models';
import { AppButton, AppScreen } from 'app/components';
import { appTheme } from 'app/theme';
import { IngredientStackParamList } from '../models';
import { IngredientList } from '../components';

type IngredientHomeScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientHome'>;

export function IngredientHomeScreen(props: IngredientHomeScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  return (
    <AppScreen>
      <AppButton
        style={styles.newIngredientButton}
        backgroundColor={appTheme.colors.ingredientPrimary}
        label={t('ingredient.ingredientHomeScreen.createIngredient')}
        onPress={() => navigation.push('IngredientCreate')}
      />

      {isFocused && (
        <IngredientList onSelectIngredient={(ingredient) => navigation.push('IngredientEdit', { ingredient })} />
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  newIngredientButton: {
    marginBottom: appTheme.gaps.medium,
  },
});
