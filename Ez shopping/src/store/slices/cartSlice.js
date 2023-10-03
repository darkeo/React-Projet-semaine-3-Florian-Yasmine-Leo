import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'CART',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const productId = action.payload;
      console.log(productId);
      if (!state.cart.includes(productId)) {
        state.cart.push(productId);
      }

      // const item = state.cart.find((item) => item.id === action.payload.id);
      // item ? item.quantity++ : state.cart.push(item.id);
    },
    removeItem(state, action) {
      const productId = action.payload;
      if (state.cart.includes(productId)) {
        const newCart = state.cart.filter((id) => {
          return id !== productId;
        });
        state.cart = newCart;
      }
    },
  },
});

export const { addItemToCart, removeItem } = cartSlice.actions;
export default cartSlice;
