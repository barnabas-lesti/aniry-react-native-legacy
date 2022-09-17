import { AppStackParamList } from './AppStackParamList';
import { AppTabBarIconProps } from './AppTabBarIconProps';

export interface AppScreen {
  name: keyof AppStackParamList;
  headerShown?: boolean;
  titleKey?: string;
  Component: () => JSX.Element;
  tabBarIcon: (props: AppTabBarIconProps) => JSX.Element;
}
