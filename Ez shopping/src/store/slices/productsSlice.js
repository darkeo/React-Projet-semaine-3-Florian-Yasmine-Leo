import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: []
  };

const productsSlice = createSlice({
    name: "PRODUCTS",
    initialState,
    reducers:{
      getProducts(state, action){
        const productArray = action.payload
        state.products = productArray
      }
    }

  })

export const {getProducts} = productsSlice.actions
export default productsSlice