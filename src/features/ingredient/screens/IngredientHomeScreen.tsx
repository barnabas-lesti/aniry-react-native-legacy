import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppStackScreenProps } from 'app/models';
import { AppButton } from 'app/components';
import { appTheme } from 'app/theme';
import { IngredientStackParamList } from '../models';
import { IngredientSearchableList } from '../components';

type IngredientHomeScreenProps = AppStackScreenProps<IngredientStackParamList, 'IngredientHome'>;

export function IngredientHomeScreen(props: IngredientHomeScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <AppButton
        style={styles.newIngredientButton}
        backgroundColor={appTheme.colors.ingredientPrimary}
        label={t('ingredient.ingredientHomeScreen.createIngredient')}
        onPress={() => navigation.push('IngredientCreate')}
      />

      <IngredientSearchableList
        onSelectIngredient={(ingredient) => navigation.push('IngredientEdit', { ingredient })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: appTheme.gaps.medium,
    paddingBottom: 0,
    flex: 1,
  },
  newIngredientButton: {
    marginBottom: appTheme.gaps.medium,
  },
});
