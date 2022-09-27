import { useDispatch } from 'react-redux';

import { appStore } from '../appStore';

type AppDispatch = typeof appStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
