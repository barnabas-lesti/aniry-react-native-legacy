import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { AppStackParamList } from '../models';

interface Notification {
  text?: string;
  textKey?: string;
}

type ActiveScreenName = keyof AppStackParamList | null;

interface AppState {
  loadingStates: boolean[];
  notification: Notification | null;
  activeScreenName: ActiveScreenName;
}

export const appState = {
  ...createSlice({
    name: 'app',

    initialState: {
      loadingStates: [],
      notification: null,
      activeScreenName: null,
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

      setActiveScreenName: (state, action: PayloadAction<ActiveScreenName>) => {
        state.activeScreenName = action.payload;
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
