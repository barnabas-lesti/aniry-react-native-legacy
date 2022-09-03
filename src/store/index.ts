import { configureStore } from '@reduxjs/toolkit';
import { commonReducer } from './states';

export const store = configureStore({
  reducer: {
    common: commonReducer,
  },
});
