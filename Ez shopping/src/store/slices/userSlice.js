import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
};

const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    modifyUser(state, action) {
      newUser = action.payload;
      state.user = newUser;
    },
  },
});

export const { modifyUser } = userSlice.actions;

export default userSlice;
