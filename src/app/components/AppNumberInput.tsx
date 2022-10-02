import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
  onChangeValue: Dispatch<SetStateAction<number>> | ((value: number) => void);
}

/**
 * App number input component.
 */
export function AppNumberInput(props: AppNumberInputProps) {
  const { value, label, postfix, placeholder, isInvalid, style, onChangeValue } = props;

  const [stringValue, setStringValue] = useState(value.toString());

  useEffect(() => {
    setStringValue(value.toString());
  }, [value]);

  function onBeforeChangeValue(newValueCandidate: string) {
    let newValue = newValueCandidate.replace(',', '.').replace(/[^\d.]/g, '');
    const lastCharacter = newValue.replace(stringValue, '');
    if (lastCharacter === '.' && stringValue.indexOf('.') !== -1) {
      newValue = newValue.slice(0, -1);
    }

    setStringValue(newValue);
    onChangeValue(parseFloat(newValue) || 0);
  }

  function onFocus() {
    if (stringValue === '0') {
      onBeforeChangeValue('');
    }
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
      onFocus={onFocus}
    />
  );
}
