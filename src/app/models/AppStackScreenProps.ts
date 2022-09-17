import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type AppStackScreenProps<A extends ParamListBase, B extends keyof A> = StackScreenProps<A, B>;
