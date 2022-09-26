import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle, View, StyleSheet } from 'react-native';

import { AppServing } from 'app/models';
import { AppButton, AppServingInput } from 'app/components';
import { appTheme } from 'app/theme';
import { Ingredient } from '../models';
import { IngredientServingEditorDialog } from './IngredientServingEditorDialog';
import { DataTable } from 'react-native-paper';

interface IngredientServingEditorProps {
  /**
   * Servings array.
   */
  servings: AppServing[];

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * On value change handler.
   */
  onChangeServings: (servings: AppServing[]) => void;
}

/**
 * Ingredient serving editor component.
 */
export function IngredientServingEditor(props: IngredientServingEditorProps) {
  const { servings, style, onChangeServings } = props;
  const { t } = useTranslation();

  const primaryServingUnits = Ingredient.PRIMARY_SERVING_UNITS;
  const secondaryServingUnits = Ingredient.SECONDARY_SERVING_UNITS;
  const [selectedServingIndex, setSelectedServingIndex] = useState<number>(0);

  const primaryServing = servings[0];

  function changeServings(index: number, updatedServing: AppServing) {
    servings[index] = updatedServing;
    onChangeServings([...servings]);
  }

  function onSecondaryServingsPress() {
    // console.log(servings);
    // setSelectedServingIndex(servings.length);
  }

  function onSecondaryServingSave(serving: AppServing) {
    changeServings(selectedServingIndex, serving);
    setSelectedServingIndex(0);
  }

  return (
    <View style={[styles.container, style]}>
      <AppServingInput
        style={styles.marginBottomSmall}
        serving={primaryServing}
        unitOptions={primaryServingUnits}
        isInvalid={!Ingredient.validateServingValue(primaryServing.value)}
        label={t('app.labels.primaryServing')}
        onChangeServing={(updatedServing) => changeServings(0, updatedServing)}
      />

      {servings.length > 1 && (
        <DataTable style={styles.marginBottomSmall}>
          {servings.splice(1).map((serving, index) => (
            <DataTable.Row
              key={index}
              onPress={() => setSelectedServingIndex(index + 1)}
            >
              <DataTable.Cell>{serving.value}</DataTable.Cell>
              <DataTable.Cell numeric>{serving.unit}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}

      <AppButton
        label={t('app.labels.addServing')}
        backgroundColor={appTheme.colors.ingredientPrimary}
        isDisabled={!Ingredient.validateServingValue(primaryServing.value)}
        onPress={onSecondaryServingsPress}
      />

      {/* {!!selectedServingIndex && (
        <IngredientServingEditorDialog
          serving={new AppServing(secondaryServingUnits[0])}
          onDiscard={() => setSelectedServingIndex(0)}
          onSave={onSecondaryServingSave}
        />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  marginBottomSmall: {
    marginBottom: appTheme.gaps.small,
  },
});
