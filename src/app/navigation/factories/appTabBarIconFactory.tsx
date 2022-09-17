import React from 'react';

import { AppIcon } from '../../components';
import { AppTabBarIconProps } from '../models';

export const appTabBarIconFactory =
  (icon: string) =>
  ({ color, size }: AppTabBarIconProps) =>
    (
      <AppIcon
        icon={icon}
        color={color}
        size={size}
      />
    );
