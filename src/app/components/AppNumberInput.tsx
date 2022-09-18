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
   * Validity flag.
   */
  isInvalid?: boolean;

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
 */
export function AppNumberInput(props: AppNumberInputProps) {
  const { value, label, postfix, placeholder, isInvalid, style, onChangeValue } = props;

  const [stringValue, setStringValue] = useState(value.toString());

  /**
   * Before value change event handler.
   * Strips non numeric characters and surprise dots.
   * @param newValueCandidate New value of the input.
   */
  function onBeforeChangeValue(newValueCandidate: string) {
    let newValue = newValueCandidate.replace(',', '.').replace(/[^\d.]/g, '');
    const lastCharacter = newValue.replace(stringValue, '');
    if (lastCharacter === '.' && stringValue.indexOf('.') !== -1) {
      newValue = newValue.slice(0, -1);
    }

    setStringValue(newValue);
    onChangeValue(parseFloat(newValue) || 0);
  }

  return (
    <AppTextInput
      keyboardType="numeric"
      style={style}
      label={label}
      postfix={postfix}
      placeholder={placeholder}
      isInvalid={isInvalid}
      value={stringValue}
      onChangeValue={(v) => onBeforeChangeValue(v.toString())}
    />
  );
}
