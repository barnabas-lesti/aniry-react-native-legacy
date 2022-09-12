import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTranslation } from 'src/i18n/hooks';
import { Ingredient, servingUnits } from 'src/store/states/ingredients';
import {
  FormTextInput,
  FormNumberInput,
  FormServingInput,
} from '../common/form';
import { CommonButton } from '../common';

interface IngredientEditorProps {
  /**
   * The ingredient object.
   */
  ingredient: Ingredient;

  /**
   * On save event handler.
   */
  onSave: (ingredient: Ingredient) => void;

  /**
   * On discard event handler.
   */
  onDiscard: () => void;
}

/**
 * Ingredient editor component.
 * @example
 * <IngredientEditor ingredient={ingredient} onSaveIngredient={onSaveIngredient} />
 */
export function IngredientEditor(props: IngredientEditorProps) {
  const { ingredient, onSave, onDiscard } = props;
  const { serving, nutrients } = ingredient;

  const { t } = useAppTranslation();
  const [name, setName] = useState(ingredient.name);
  const [servingValue, setServingValue] = useState(serving.value);
  const [servingUnit, setServingUnit] = useState(serving.unit);
  const [calories, setCalories] = useState(nutrients.calories);
  const [carbs, setCarbs] = useState(nutrients.carbs);
  const [protein, setProtein] = useState(nutrients.protein);
  const [fat, setFat] = useState(nutrients.fat);

  const servingUnitOptions = Object.keys(servingUnits).map((unit) => ({
    value: unit,
    label: t(servingUnits[unit as keyof typeof servingUnits]),
  }));

  function onSaveButtonClick() {
    onSave(
      new Ingredient({
        id: ingredient.id,
        name,
        serving: {
          value: servingValue,
          unit: servingUnit,
        },
        nutrients: {
          calories,
          carbs,
          protein,
          fat,
        },
      })
    );
  }

  return (
    <View style={styles.container}>
      <FormTextInput
        label={t('common.labels.name')}
        style={styles.inputs}
        value={name}
        onChangeValue={setName}
      />

      <FormServingInput
        style={styles.inputs}
        label={t('common.labels.serving')}
        servingValue={servingValue}
        unitValue={servingUnit}
        options={servingUnitOptions}
        onChangeServingValue={setServingValue}
        onChangeUnitValue={setServingUnit}
      />

      <FormNumberInput
        label={t('common.labels.calories')}
        postfix={t('common.units.kcal')}
        style={styles.inputs}
        value={calories}
        onChangeValue={setCalories}
      />

      <FormNumberInput
        label={t('common.labels.carbs')}
        postfix={t('common.units.g')}
        style={styles.inputs}
        value={carbs}
        onChangeValue={setCarbs}
      />

      <FormNumberInput
        label={t('common.labels.protein')}
        postfix={t('common.units.g')}
        style={styles.inputs}
        value={protein}
        onChangeValue={setProtein}
      />

      <FormNumberInput
        label={t('common.labels.fat')}
        postfix={t('common.units.g')}
        style={styles.inputs}
        value={fat}
        onChangeValue={setFat}
      />

      <CommonButton
        style={styles.buttons}
        label={t('common.labels.save')}
        onPress={onSaveButtonClick}
      />

      <CommonButton
        style={styles.buttons}
        label={t('common.labels.discard')}
        onPress={onDiscard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputs: {
    marginBottom: 8,
  },
  buttons: {
    marginTop: 8,
  },
});
