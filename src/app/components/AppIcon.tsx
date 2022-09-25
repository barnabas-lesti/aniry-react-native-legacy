import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

interface AppIconProps {
  /**
   * Icon to render: https://materialdesignicons.com
   */
  icon: string;

  /**
   * Color of the icon.
   */
  color?: string;

  /**
   * Size of the icon.
   */
  size?: number;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Application icon component.
 */
export function AppIcon(props: AppIconProps) {
  const { icon, color, size = 20, style } = props;

  return (
    <IconButton
      icon={icon}
      iconColor={color}
      size={size}
      style={[styles.icon, style]}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    margin: 0,
    padding: 0,
  },
});
