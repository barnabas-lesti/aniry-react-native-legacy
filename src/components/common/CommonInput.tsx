import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';

interface CommonInputProps {
  /**
   * String type initial value. Change handler prop: `onChangeText`.
   */
  text?: string;

  /**
   * Number type initial value. Change handler prop: `onChangeNumber`.
   */
  number?: number;

  /**
   * Label to display.
   */
  label?: string;

  /**
   * Placeholder to display.
   */
  placeholder?: string;

  /**
   * Custom styles.
   */
  style?: StyleProp<TextStyle>;

  /**
   * String type change handler. Initial value prop: `text`.
   */
  onChangeText?: Dispatch<SetStateAction<string>>;

  /**
   * Number type change handler. Initial value prop: `number`.
   */
  onChangeNumber?: Dispatch<SetStateAction<number>>;
}

/**
 * Common input component.
 * @example
 * // Text type input
 * <CommonInput label="Name" text={name} onChangeText={onChangeName} />
 * // Number type input
 * <CommonInput label="Count" number={count} onChangeNumber={onChangeCount} />
 */
export default function CommonInput(props: CommonInputProps) {
  const {
    text,
    number,
    label,
    placeholder,
    style,
    onChangeText,
    onChangeNumber,
  } = props;

  const [value, onChangeValue] = useState(text || number?.toString() || '');
  const [borderColor, onChangeBorderColor] = useState(styles.input.borderColor);
  const [isFocused, onChangeIsFocused] = useState(false);
  const [isValid, onChangeIsValid] = useState(true);

  const keyboardType = number !== undefined ? 'numeric' : 'default';

  /**
   * Border color change manager hook.
   */
  useEffect(() => {
    if (!isValid) {
      onChangeBorderColor(styles.inputInvalid.borderColor);
    } else if (isFocused) {
      onChangeBorderColor(styles.inputFocused.borderColor);
    } else {
      onChangeBorderColor(styles.input.borderColor);
    }
  }, [isFocused, isValid]);

  /**
   * Input change event handler.
   * @param newInputValue New value of the input.
   */
  function onInputChange(newValue: string) {
    onChangeValue(newValue);

    if (number !== undefined) {
      onChangeIsValid(!isNumberValid(newValue));
      onChangeNumber && onChangeNumber(parseFloat(newValue) || 0);
    } else {
      onChangeText && onChangeText(newValue);
    }
  }

  /**
   * Validates if the provided string is a number.
   * @param numberString Number in string format.
   * @returns Boolean depending on the validation.
   */
  function isNumberValid(numberString: string) {
    return isNaN(parseFloat(numberString));
  }

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, { borderColor }]}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={onInputChange}
        onFocus={() => onChangeIsFocused(true)}
        onBlur={() => onChangeIsFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    marginBottom: 4,
    color: '#777',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    marginHorizontal: 0,
    marginVertical: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
    fontSize: 14,
  },
  inputFocused: {
    borderColor: '#33bbff',
  },
  inputInvalid: {
    borderColor: '#d2322d',
  },
});
