import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

import { appTheme } from '../theme';

interface AppButtonProps {
  /**
   * Label to display.
   */
  label: string;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Loading state indicator.
   */
  isLoading?: boolean;

  /**
   * Type of the button.
   */
  type?: 'primary' | 'secondary' | 'danger';

  /**
   * Background color override for the button.
   */
  backgroundColor?: string;

  /**
   * Text color override for the button.
   */
  textColor?: string;

  /**
   * On button press event handler.
   */
  onPress: () => void;
}

/**
 * App button component.
 */
export function AppButton(props: AppButtonProps) {
  const { label, type = 'primary', style, isLoading, backgroundColor, textColor, onPress } = props;

  function getBackgroundColor() {
    if (backgroundColor) return backgroundColor;

    if (type === 'secondary') return '';
    if (type === 'danger') return appTheme.colors.error;

    return appTheme.colors.primary;
  }

  function getTextColor() {
    if (textColor) return textColor;

    return '';
  }

  function getMode() {
    if (type === 'secondary') return 'outlined';
    return 'contained';
  }

  return (
    <Button
      onPress={onPress}
      mode={getMode()}
      style={style}
      loading={isLoading}
      buttonColor={getBackgroundColor()}
      textColor={getTextColor()}
    >
      {label}
    </Button>
  );
}
