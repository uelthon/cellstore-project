import { createSlice } from "@reduxjs/toolkit";
import productServices from '../services/products'
import { setNoti } from "./notiReducer";

const productSlice = createSlice({
  name:'products',
  initialState:{
    value:null
  },
  reducers:{
    setproducts:(state,action) => {
      state.value = action.payload
    },
    set_new:(state, action) => {
      state.value = [...state.value, action.payload]
    },
    update: (state, action) => {
      const item = action.payload
      const products = state.value.map(e => e.id === item.id ? item : e)
      state.value = products
    },
    delete_product: (state, action) => {
      const products = state.value.filter(e => e.id !== action.payload)
      state.value = products
    }
  }
})

export const {setproducts, set_new, update, delete_product} = productSlice.actions

export const getProducts = () => {
  return async dispatch => {
      try{
      const items = await productServices.getAll()
      dispatch(setproducts(items))
      }catch(e){
        console.log(e)
      }
  }
}

export const setNewProduct = (item, setShow) => {
  return async dispatch => {
    try{
    const product = await productServices.createProduct(item)
    dispatch(set_new(product))
    setShow(false)
    dispatch(setNoti(['New Product has been created','success']))
    }catch(e){
      console.log(e)
    }
  }
}

export const updateProduct = (id, body) => {
  return async dispatch => {
    try{
    const product = await productServices.updateProduct(id,body)
    dispatch(update(product))
    dispatch(setNoti(['Price has been changed','success']))
    }catch(e){
      console.log(e)
    }
  }
}

export const deleteProduct = (id) => {
  return async dispatch => {
    try{
      await productServices.deleteProduct(id)
      dispatch(delete_product(id))
      dispatch(setNoti(['Product has been deleted','danger']))
    }catch(e){
      console.log(e)
    }
  }
}

export default productSlice.reducer