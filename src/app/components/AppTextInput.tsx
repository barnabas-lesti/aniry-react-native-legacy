import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';

interface AppTextInputProps {
  /**
   * Initial value.
   */
  value: string;

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
 * App text input component.
 * @example
 * <AppInput label="Name" value={name} onChangeValue={onChangeName} />
 */
export function AppTextInput(props: AppTextInputProps) {
  const {
    value,
    label,
    postfix,
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
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { borderColor },
            postfix !== undefined && styles.inputWithPostfix,
          ]}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChangeValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {postfix && <Text style={styles.postfix}>{postfix}</Text>}
      </View>
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
  postfix: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  inputContainer: {
    position: 'relative',
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
  inputWithPostfix: {
    paddingEnd: 50,
  },
});
