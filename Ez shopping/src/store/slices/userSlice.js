import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
  },
  errors: [],
  formValidation: false,
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
      const regexEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (newUser.firstName.length === 0) {
        state.errors.push('Veuillez entrer votre prénom');
      }
      if (newUser.lastName.length === 0) {
        state.errors.push('Veuillez entrer votre nom');
      }
      if (newUser.email.length === 0) {
        state.errors.push('Veuillez entrer votre adresse email');
      }
      if (!newUser.email.toLowerCase().match(regexEmail)) {
        state.errors.push(`Format d'email incorrect`);
      }
      state.errors.length > 0
        ? (state.formValidation = false)
        : (state.formValidation = true);
    },
  },
});

export const { modifyUser, validateUser } = userSlice.actions;

export default userSlice;
