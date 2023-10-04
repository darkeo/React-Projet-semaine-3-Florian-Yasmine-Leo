import { createSlice } from '@reduxjs/toolkit';
import {
  addToLocalStorage,
  getFromLocalStorage,
  isKeyInLocalStorage,
} from '../../utils/localStorage';

const initialState = {
  cart: isKeyInLocalStorage('cart') ? getFromLocalStorage('cart') : [],
};

const cartSlice = createSlice({
  name: 'CART',
  initialState,
  reducers: {
    // copyLocalStorageToCArt(state) {
    //   if (isKeyInLocalStorage('cart')) {
    //     const cartFromLocalStorage = getFromLocalStorage('cart');
    //     state.cart = cartFromLocalStorage;
    //   }
    // },
    addItemToCart(state, action) {
      const { id, quantity } = action.payload;

      // Check if the product with the given id already exists in the cart
      const existingProduct = state.cart.find((product) => product.id === id);

      if (existingProduct) {
        // If the product exists, create a new cart array with updated quantity
        const updatedCart = state.cart.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + quantity }
            : product
        );

        return { ...state, cart: updatedCart };
      } else {
        // If the product doesn't exist, create a new cart array with the added product
        const newCart = [...state.cart, action.payload];
        return { ...state, cart: newCart };
      }
    },
    decreaseQuantity(state, action) {
      const productId = action.payload;
      const newCart = state.cart.map((product) => {
        if (product.id === productId) {
          if (product.quantity <= 0) {
            return product;
          }
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      state.cart = newCart;
    },
    increaseQuantity(state, action) {
      const productId = action.payload;
      const newCart = state.cart.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      state.cart = newCart;
    },
    removeItem(state, action) {
      const productId = action.payload;
      const newCart = state.cart.filter((product) => {
        return product.id !== productId;
      });
      state.cart = newCart;
    },
    removeAllItems(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addItemToCart,
  removeItem,
  decreaseQuantity,
  increaseQuantity,
  removeAllItems,
} = cartSlice.actions;
export default cartSlice;
