import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTranslation } from 'src/i18n/hooks';
import { Ingredient, servingUnits } from 'src/store/states/ingredients';
import { FormTextInput, FormServingInput } from '../common/form';

interface IngredientEditorProps {
  ingredient: Ingredient;
}

export function IngredientEditor(props: IngredientEditorProps) {
  const { ingredient } = props;
  const { serving } = ingredient;

  const { t } = useAppTranslation();
  const [name, setName] = useState(ingredient.name);
  const [servingValue, setServingValue] = useState(serving.value);
  const [servingUnit, setServingUnit] = useState(serving.unit);

  const servingUnitOptions = Object.keys(servingUnits).map((unit) => ({
    value: unit,
    label: t(servingUnits[unit as keyof typeof servingUnits]),
  }));

  useEffect(() => {
    // console.log(servingValue);
  }, [servingValue]);

  return (
    <View style={styles.container}>
      <FormTextInput
        label="Name"
        placeholder="Eg.: Onions"
        style={styles.inputs}
        value={name}
        onChangeValue={setName}
      />

      <FormServingInput
        style={styles.inputs}
        label="Serving"
        servingValue={servingValue}
        unitValue={servingUnit}
        options={servingUnitOptions}
        onChangeServingValue={setServingValue}
        onChangeUnitValue={setServingUnit}
      />

      <Text>{name}</Text>
      <Text>{servingValue}</Text>
      <Text>{servingUnit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
  },
  inputs: {
    marginBottom: 8,
  },
});
