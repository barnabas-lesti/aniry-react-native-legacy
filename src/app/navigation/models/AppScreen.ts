import { AppStackParamList } from './AppStackParamList';
import { AppTabBarIconProps } from './AppTabBarIconProps';

/**
 * App screen type.
 */
export interface AppScreen {
  name: keyof AppStackParamList;
  Component: () => JSX.Element;
  titleKey: string;
  tabBarIcon: (props: AppTabBarIconProps) => JSX.Element;
}
