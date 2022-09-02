import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Ingredients: undefined;
};

export function useAppNavigation<T extends keyof RootStackParamList>() {
  return useNavigation<NativeStackNavigationProp<RootStackParamList, T>>();
}

export function createAppNavigator() {
  return createNativeStackNavigator<RootStackParamList>();
}
