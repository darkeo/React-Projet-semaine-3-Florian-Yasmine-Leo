import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice.js';
import productsSlice from './slices/productsSlice.js';
import cartSlice from './slices/cartSlice.js';
import saveBasketMiddleware from './middleWare/saveBasketMiddleware.js';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([saveBasketMiddleware]),
});

export default store;
