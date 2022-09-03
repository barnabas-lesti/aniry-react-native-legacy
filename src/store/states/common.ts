import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CommonState = {
  test: string;
};

const initialState: CommonState = {
  test: '',
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<string>) => {
      state.test = action.payload;
    },
  },
});

export const commonActions = commonSlice.actions;
export const commonReducer = commonSlice.reducer;
