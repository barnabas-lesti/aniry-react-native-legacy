import React, { Dispatch, SetStateAction } from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';

import { SelectOption } from './types';
import { FormNumberInput } from './FormNumberInput';
import { FormSelectInput } from './FormSelectInput';

interface FormServingInputProps {
  /**
   * Initial serving value.
   */
  servingValue: number;

  /**
   * Initial unit value.
   */
  unitValue: string;

  /**
   * Unit options.
   */
  options: Array<SelectOption>;

  /**
   * Custom styles.
   */
  style?: StyleProp<TextStyle>;

  /**
   * Label to display.
   */
  label?: string;

  /**
   * Placeholder to display.
   */
  placeholder?: string;

  /**
   * Serving value change handler.
   */
  onChangeServingValue: Dispatch<SetStateAction<number>>;

  /**
   * Unit value change handler.
   */
  onChangeUnitValue: Dispatch<SetStateAction<any>>;
}

/**
 * Form serving editor input component.
 * @example
 * <FormServingInput
 *   label="Serving"
 *   servingValue={servingValue}
 *   unitValue={servingUnit}
 *   options={servingUnitOptions}
 *   onChangeServingValue={setServingValue}
 *   onChangeUnitValue={setServingUnit}
 * />
 */
export function FormServingInput(props: FormServingInputProps) {
  const {
    servingValue,
    unitValue,
    options,
    placeholder,
    label,
    style,
    onChangeServingValue,
    onChangeUnitValue,
  } = props;

  return (
    <View style={[styles.container, style]}>
      <FormNumberInput
        style={styles.value}
        label={label}
        placeholder={placeholder}
        value={servingValue}
        onChangeValue={onChangeServingValue}
      />
      <FormSelectInput
        style={styles.unit}
        options={options}
        value={unitValue}
        onChangeValue={onChangeUnitValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    marginRight: 6,
    flexGrow: 1,
  },
  unit: {
    minWidth: 70,
  },
});
