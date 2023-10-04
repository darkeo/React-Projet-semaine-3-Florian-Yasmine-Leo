import { createSlice } from '@reduxjs/toolkit';
import { addToLocalStorage } from '../../utils/localStorage';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'CART',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const { id, quantity } = action.payload;

      // Recherche le produit dans le panier par son id
      const existingProduct = state.cart.find((item) => item.id === id);

      if (existingProduct) {
        // Si le produit existe déjà dans le panier, met à jour la quantité
        existingProduct.quantity += quantity;
      } else {
        // Si le produit n'existe pas dans le panier, l'ajoute
        state.cart.push({ id, quantity });
      }

      // on save le panier dans le localStorage
      addToLocalStorage('cart', state.cart);
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
