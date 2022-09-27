import { createSlice } from '@reduxjs/toolkit';

interface AppInitialState {
  isLoading: boolean;
}

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
  } as AppInitialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const appStateActions = appSlice.actions;
export const appReducer = appSlice.reducer;
