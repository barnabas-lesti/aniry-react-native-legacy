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
   * On button press event handler.
   */
  onPress: () => void;
}

/**
 * App button component.
 */
export function AppButton(props: AppButtonProps) {
  const { label, type = 'primary', style, isLoading, onPress } = props;

  function getButtonColor() {
    if (type === 'secondary') return '';
    if (type === 'danger') return appTheme.colors.error;
    return appTheme.colors.primary;
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
      buttonColor={getButtonColor()}
    >
      {label}
    </Button>
  );
}
