import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice.js';
import productsSlice from './slices/productsSlice.js';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
