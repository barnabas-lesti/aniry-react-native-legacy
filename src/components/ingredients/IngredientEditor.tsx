import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CommonInput } from '../common';
import { Ingredient } from '../../store/states/ingredients';

export default function IngredientEditor(props: IngredientEditorProps) {
  const { ingredient } = props;
  const { serving } = ingredient;
  const [name, onChangeName] = useState(ingredient.name);
  const [servingValue, onChangeServingValue] = useState(serving.value);
  const [servingUnit, onChangeServingUnit] = useState(serving.unit);

  useEffect(() => {
    // console.log(servingValue);
  }, [servingValue]);

  return (
    <View style={styles.container}>
      <CommonInput
        label="Name"
        placeholder="Eg.: Onions"
        style={styles.inputs}
        text={name}
        onChangeText={onChangeName}
      />
      <CommonInput
        label="Serving value"
        placeholder="Eg.: 100"
        number={servingValue}
        onChangeNumber={onChangeServingValue}
      />

      <Text>{name}</Text>
      <Text>{servingValue}</Text>
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

interface IngredientEditorProps {
  ingredient: Ingredient;
}
