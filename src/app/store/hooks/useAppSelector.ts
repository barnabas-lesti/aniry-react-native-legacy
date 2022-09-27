import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { appStore } from '../appStore';

type AppRootState = ReturnType<typeof appStore.getState>;

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
