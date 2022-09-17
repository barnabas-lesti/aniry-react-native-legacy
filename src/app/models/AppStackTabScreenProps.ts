import { ParamListBase } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type AppStackTabScreenProps<A extends ParamListBase, B extends keyof A> = BottomTabScreenProps<A, B>;
