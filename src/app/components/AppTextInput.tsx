import React, { Dispatch, SetStateAction } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { TextInput } from 'react-native-paper';

import { useAppSelector } from '../store/hooks';
import { appState } from '../state';
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
  isInvalid?: boolean;

  /**
   * Does the text input support multiple line.
   */
  isMultiline?: boolean;

  /**
   * Text change handler.
   */
  onChangeValue: Dispatch<SetStateAction<string>>;

  /**
   * On focus event handler.
   */
  onFocus?: () => void;
}

/**
 * App text input component.
 */
export function AppTextInput(props: AppTextInputProps) {
  const {
    value,
    label,
    postfix,
    placeholder,
    keyboardType = 'default',
    isInvalid,
    readonly,
    style,
    isMultiline,
    onChangeValue,
    onFocus,
  } = props;

  const isAppLoading = appState.selectors.isAppLoading(useAppSelector((state) => state.app));

  return (
    <TextInput
      dense
      selectTextOnFocus={!isMultiline}
      mode="outlined"
      style={style}
      label={label}
      value={value}
      error={isInvalid}
      placeholder={placeholder}
      keyboardType={keyboardType}
      editable={!readonly}
      disabled={isAppLoading}
      activeOutlineColor={appTheme.colors.primary}
      multiline={isMultiline}
      onChangeText={onChangeValue}
      right={postfix && <TextInput.Affix text={postfix} />}
      onFocus={onFocus}
    />
  );
}
