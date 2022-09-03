import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppRootState, AppDispatch } from './types';

/**
 * App level dispatch hook factory function.
 * @returns Dispatch function.
 * @example
 * import { useAppDispatch } from './store/hooks';
 * const dispatch = useAppDispatch();
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * App level state provider function.
 * @returns State object.
 * @example
 * import { useAppSelector } from './store/hooks';
 * const { test } = useAppSelector((state) => state.common);
 */
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
