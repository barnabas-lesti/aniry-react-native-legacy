import React from 'react';
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
}

/**
 * Application icon component.
 */
export function AppIcon(props: AppIconProps) {
  const { icon, color, size = 20 } = props;

  return (
    <IconButton
      icon={icon}
      iconColor={color}
      size={size}
    />
  );
}
