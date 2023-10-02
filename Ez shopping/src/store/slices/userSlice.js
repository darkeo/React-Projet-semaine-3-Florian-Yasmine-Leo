import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    isLogged: false,
  },
  errors: [],
};

const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    modifyUser(state, action) {
      const newUser = action.payload;
      state.user = newUser;
    },
    validateUser(state, action) {
      state.errors = [];
      const newUser = action.payload;
      if (newUser.firstName.length === 0) {
        state.errors.push('Veuillez entrer votre prénom');
      }
    },
  },
});

export const { modifyUser, validateUser } = userSlice.actions;

export default userSlice;
