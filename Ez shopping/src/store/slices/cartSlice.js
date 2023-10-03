import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
};

const cartSlice = createSlice({
  name: "CART",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const item = state.cart.find((item) => item.id === action.payload.id);
      item
        ? item.quantity++
        : state.cart.push({ ...action.payload, quantity: 1 });
    },
    removeItem(state, action) {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
    incrementItem(state, action) {
      const item = state.cart.find((item) => item.id === action.payload.id);
      item.quantity++;
    },
    decrementItem(state, action) {
      const item = state.cart.find((item) => item.id === action.payload.id);
      item === 1 ? (item.quantity = 1) : item.quantity--;
    },
  },
});

export const { addItemToCart, removeItem, incrementItem, decrementItem } =
  cartSlice.actions;
export default cartSlice;
