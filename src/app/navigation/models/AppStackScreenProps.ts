import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * App stack screen props type.
 */
export type AppStackScreenProps<A extends ParamListBase, B extends keyof A> = NativeStackScreenProps<A, B>;
