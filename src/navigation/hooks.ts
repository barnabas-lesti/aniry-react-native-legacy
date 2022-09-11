import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from './types';

/**
 * App level navigation prop factory function.
 * @returns Navigation prop.
 * @example
 * import { useAppNavigation } from './navigation/hooks';
 * const navigation = useAppNavigation<'Home'>();
 */
export function useAppNavigation<T extends keyof RootStackParamList>() {
  return useNavigation<NativeStackNavigationProp<RootStackParamList, T>>();
}
