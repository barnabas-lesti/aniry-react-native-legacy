import React, { Dispatch, SetStateAction } from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';

import type { AppSelectOption } from './models';
import { AppNumberInput } from './AppNumberInput';
import { AppSelectInput } from './AppSelectInput';

interface AppServingInputProps {
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
  options: Array<AppSelectOption>;

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
 * App serving editor input component.
 * @example
 * <AppServingInput
 *   label="Serving"
 *   servingValue={servingValue}
 *   unitValue={servingUnit}
 *   options={servingUnitOptions}
 *   onChangeServingValue={setServingValue}
 *   onChangeUnitValue={setServingUnit}
 * />
 */
export function AppServingInput(props: AppServingInputProps) {
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
      <AppNumberInput
        style={styles.value}
        label={label}
        placeholder={placeholder}
        value={servingValue}
        onChangeValue={onChangeServingValue}
      />
      <AppSelectInput
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
