import { AppStackParamList } from './AppStackParamList';
import { AppTabBarIconProps } from './AppTabBarIconProps';

export interface AppScreenOptions {
  name: keyof AppStackParamList;
  Component: () => JSX.Element;
  tabBarIcon: (props: AppTabBarIconProps) => JSX.Element;
  headerShown?: boolean;
  titleKey?: string;
  activeColor?: string;
}
