import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';

interface FormTextInputProps {
  /**
   * Initial value.
   */
  value: string;

  /**
   * Label to display.
   */
  label?: string;

  /**
   * Placeholder to display.
   */
  placeholder?: string;

  /**
   * Keyboard type.
   */
  keyboardType?: 'default' | 'numeric';

  /**
   * Custom styles.
   */
  style?: StyleProp<TextStyle>;

  /**
   * Validity flag.
   */
  isValid?: boolean;

  /**
   * Text change handler.
   */
  onChangeValue: Dispatch<SetStateAction<string>>;
}

/**
 * Form text input component.
 * @example
 * <FormInput label="Name" value={name} onChangeValue={onChangeName} />
 */
export function FormTextInput(props: FormTextInputProps) {
  const {
    value,
    label,
    placeholder,
    keyboardType = 'default',
    isValid = true,
    style,
    onChangeValue,
  } = props;

  const [borderColor, setBorderColor] = useState(styles.input.borderColor);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isValid) {
      setBorderColor(styles.inputInvalid.borderColor);
    } else if (isFocused) {
      setBorderColor(styles.inputFocused.borderColor);
    } else {
      setBorderColor(styles.input.borderColor);
    }
  }, [isFocused, isValid]);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, { borderColor }]}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={onChangeValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
    backgroundColor: '#fff',
    fontSize: 14,
    lineHeight: 18,
    height: 36,
    margin: 0,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
  inputFocused: {
    borderColor: '#33bbff',
  },
  inputInvalid: {
    borderColor: '#d2322d',
  },
});
