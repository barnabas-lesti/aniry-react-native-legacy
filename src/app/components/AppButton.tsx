import React from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';
import { Button } from 'react-native-paper';

import { useAppSelector } from '../store/hooks';
import { appState } from '../state';
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
   * Disabled state setting.
   */
  isDisabled?: boolean;

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
   * Use a compact look.
   */
  compact?: boolean;

  /**
   * On button press event handler.
   */
  onPress: () => void;
}

/**
 * App button component.
 */
export function AppButton(props: AppButtonProps) {
  const { label, type = 'primary', style, isDisabled, backgroundColor, textColor, compact, onPress } = props;

  const isAppLoading = appState.selectors.isAppLoading(useAppSelector((state) => state.app));

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
    <View style={style}>
      <Button
        onPress={onPress}
        mode={getMode()}
        buttonColor={getBackgroundColor()}
        textColor={getTextColor()}
        disabled={isDisabled || isAppLoading}
        compact={compact}
      >
        {label}
      </Button>
    </View>
  );
}
