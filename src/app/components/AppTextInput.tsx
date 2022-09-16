import React, { Dispatch, SetStateAction } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { TextInput } from 'react-native-paper';

import { appTheme } from '../theme';

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
   * Renders the input readonly.
   */
  readonly?: boolean;

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
    readonly,
    style,
    onChangeValue,
  } = props;

  return (
    <TextInput
      dense
      mode="outlined"
      style={style}
      label={label}
      value={value}
      error={!isValid}
      placeholder={placeholder}
      keyboardType={keyboardType}
      editable={!readonly}
      activeOutlineColor={appTheme.colors.primary}
      onChangeText={onChangeValue}
      right={postfix && <TextInput.Affix text={postfix} />}
    />
  );
}
