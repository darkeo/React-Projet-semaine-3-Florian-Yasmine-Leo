import { createSlice } from '@reduxjs/toolkit';
import { addToLocalStorage } from '../../utils/localStorage';

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
  },
  pendingUser: {
    firstName: '',
    lastName: '',
    email: '',
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
    modifyPendingUser(state, action) {
      const user = action.payload;
      state.pendingUser = user;
    },
    validateUser(state, action) {
      state.errors = [];
      const newUser = action.payload;
      const regexEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const regexSpecialCharacters = /^(|[A-Za-zÀ-ÖØ-öø-ÿ\s-\d]+)$/;
      const disallowedChars = `! @ # $ % ^ & * ( ) _ + - = [ ] { } ; : , < > / ?  | " \\ '`;

      if (newUser.firstName.length === 0) {
        state.errors.push('Veuillez entrer votre prénom');
      }
      if (newUser.firstName.length > 30) {
        state.errors.push('Le champs "Prénom" est limité à 30 caractères');
      }
      if (!newUser.firstName.toLowerCase().match(regexSpecialCharacters)) {
        state.errors.push(
          `Votre prénom ne doit pas contenir de caractères spéciaux ${disallowedChars}`
        );
      }
      if (newUser.lastName.length === 0) {
        state.errors.push('Veuillez entrer votre nom');
      }
      if (newUser.lastName.length > 30) {
        state.errors.push('Le champs "Nom" est limité à 30 caractères');
      }
      if (!newUser.lastName.toLowerCase().match(regexSpecialCharacters)) {
        state.errors.push(
          `Votre nom ne doit pas contenir de caractères spéciaux ${disallowedChars}`
        );
      }
      if (newUser.email.length === 0) {
        state.errors.push('Veuillez entrer votre adresse email');
      }
      if (!newUser.email.toLowerCase().match(regexEmail)) {
        state.errors.push(`Format d'email incorrect`);
      }
      if (state.errors.length > 0) {
        return;
      } else {
        state.user = state.pendingUser;
        addToLocalStorage('user', state.pendingUser);
      }
    },
  },
});

export const { modifyUser, modifyPendingUser, validateUser } =
  userSlice.actions;

export default userSlice;
