import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Ingredient } from 'features/ingredients/models';

/**
 * App screen list type.
 */
export type AppStackParamList = {
  Home: undefined;
  Ingredients: undefined;
  EditIngredient: { ingredient: Ingredient } | undefined;
};

/**
 * App screen type.
 */
export type AppScreen = {
  name: keyof AppStackParamList;
  Component: () => JSX.Element;
  titleKey: string;
};

/**
 * App stack screen props type.
 */
export type AppStackScreenProps<A extends ParamListBase, B extends keyof A> = NativeStackScreenProps<A, B>;
