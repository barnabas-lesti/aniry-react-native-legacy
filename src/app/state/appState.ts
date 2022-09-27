import { createSlice, createSelector } from '@reduxjs/toolkit';

interface AppInitialState {
  loadingStates: boolean[];
}

const selectAppState = (app: AppInitialState) => app;

export const appState = {
  ...createSlice({
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
  }),

  selectors: {
    isLoading: createSelector(selectAppState, ({ loadingStates }) => !!loadingStates.length),
  },
};
