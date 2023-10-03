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
        const newProductArray = productArray.map((product)=>{
          return {...product, quantity:0}
        })
        state.products = newProductArray
      },
      updateProduct(state, action){
        const productId = action.payload.productId
        const quantity = Number(action.payload.quantity)
        console.log(productId, quantity)
        const products = state.products
        const newProductArray = products.map((product)=>{
          if (product.id === productId){
            return {...product, quantity:quantity}
          }
          return product
        })
        state.products = newProductArray
        console.log(state.products)
      }
    }

  })

export const {getProducts, updateProduct} = productsSlice.actions
export default productsSlice