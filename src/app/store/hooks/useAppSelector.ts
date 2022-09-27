import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { AppRootState } from '../models';

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
