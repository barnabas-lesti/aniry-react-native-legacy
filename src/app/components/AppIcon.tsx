import React from 'react';
import { IconButton } from 'react-native-paper';

interface AppIconProps {
  icon: string;

  color?: string;

  size?: number;
}

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
