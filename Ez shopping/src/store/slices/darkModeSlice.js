import { createSlice } from '@reduxjs/toolkit';
import {
  getFromLocalStorage,
  isKeyInLocalStorage,
} from '../../utils/localStorage';

const initialState = {
  darkMode: isKeyInLocalStorage('darkMode')
    ? getFromLocalStorage('darkMode')
    : false,
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
