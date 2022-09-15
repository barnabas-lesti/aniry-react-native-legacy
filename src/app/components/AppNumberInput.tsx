import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { AppTextInput } from './AppTextInput';

interface AppNumberInputProps {
  /**
   * Initial value.
   */
  value: number;

  /**
   * Label to display.
   */
  label?: string;

  /**
   * Postfix to add to the end of the input.
   */
  postfix?: string;

  /**
   * Placeholder to display.
   */
  placeholder?: string;

  /**
   * Custom styles.
   */
  style?: StyleProp<TextStyle>;

  /**
   * Value change handler.
   */
  onChangeValue: Dispatch<SetStateAction<number>>;
}

/**
 * App number input component.
 * @example
 * <AppInput label="Count" value={count} onChangeValue={onChangeCount} />
 */
export function AppNumberInput(props: AppNumberInputProps) {
  const { value, label, postfix, placeholder, style, onChangeValue } = props;

  const [inputValue, setInputValue] = useState(value.toString());
  const [isValid, setIsValid] = useState(isNumberValid(inputValue));

  /**
   * Input change event handler.
   * @param newValue New value of the input.
   */
  function onInputChange(newValue: string) {
    setInputValue(newValue);

    setIsValid(isNumberValid(newValue));
    onChangeValue(parseFloat(newValue) || 0);
  }

  /**
   * Validates if the provided string is a number.
   * @param numberString Number in string format.
   * @returns Boolean depending on the validation.
   */
  function isNumberValid(numberString: string) {
    return !isNaN(parseFloat(numberString));
  }

  return (
    <AppTextInput
      style={style}
      label={label}
      postfix={postfix}
      placeholder={placeholder}
      isValid={isValid}
      keyboardType="numeric"
      value={inputValue}
      onChangeValue={(v) => onInputChange(v.toString())}
    />
  );
}
