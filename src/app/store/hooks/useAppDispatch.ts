import { useDispatch } from 'react-redux';

import { AppDispatch } from '../models';

export const useAppDispatch: () => AppDispatch = useDispatch;
