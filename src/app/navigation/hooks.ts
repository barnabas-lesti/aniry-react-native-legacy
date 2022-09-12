import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { AppScreenList } from './models';

/**
 * App level navigation prop factory function.
 * @returns Navigation prop.
 * @example
 * import { useAppNavigation } from 'app/hooks';
 * const navigation = useAppNavigation<'Home'>();
 */
export function useAppNavigation<T extends keyof AppScreenList>() {
  return useNavigation<NativeStackNavigationProp<AppScreenList, T>>();
}
