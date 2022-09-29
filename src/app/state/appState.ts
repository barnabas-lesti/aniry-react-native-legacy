import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  text?: string;
  textKey?: string;
}

interface AppState {
  loadingStates: boolean[];
  notification: Notification | null;
}

export const appState = {
  ...createSlice({
    name: 'app',

    initialState: {
      loadingStates: [],
      notification: null,
    } as AppState,

    reducers: {
      startLoading: (state) => {
        state.loadingStates = [...state.loadingStates, true];
      },
      stopLoading: (state) => {
        state.loadingStates = [...state.loadingStates.slice(0, -1)];
      },

      showNotification: (state, action: PayloadAction<Notification>) => {
        state.notification = action.payload;
      },
      clearNotification: (state) => {
        state.notification = null;
      },
    },
  }),

  asyncActions: {},

  selectors: {
    isAppLoading: createSelector(
      (app: AppState) => app,
      ({ loadingStates }) => !!loadingStates.length
    ),
  },
};
