import { ParamListBase } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

/**
 * App stack screen props type.
 */
export type AppStackScreenProps<A extends ParamListBase, B extends keyof A> = BottomTabScreenProps<A, B>;
