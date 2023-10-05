import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};

const darkModeSlice = createSlice({
  name: 'DARKMODE',
  initialState,
  reducers: {
    switchMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { switchMode } = darkModeSlice.actions;

export default darkModeSlice;
