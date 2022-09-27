import { createSlice, createSelector } from '@reduxjs/toolkit';

interface AppInitialState {
  loadingStates: boolean[];
}

const appSlice = createSlice({
  name: 'app',

  initialState: {
    loadingStates: [],
  } as AppInitialState,

  reducers: {
    startLoading: (state) => {
      state.loadingStates = [...state.loadingStates, true];
    },
    stopLoading: (state) => {
      state.loadingStates = [...state.loadingStates.slice(0, -1)];
    },
  },
});

const selectApp = (app: AppInitialState) => app;

export const appStateSelectors = {
  isLoading: createSelector(selectApp, ({ loadingStates }) => !!loadingStates.length),
};

export const appStateActions = appSlice.actions;
export const appStateReducer = appSlice.reducer;
