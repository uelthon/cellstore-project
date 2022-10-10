import { createSlice } from "@reduxjs/toolkit";
import cartServices from "../services/carts";

const userSlice = createSlice({
  name:'user',
  initialState:{
    value:null
  },
  reducers:{
    setUsuario:(state, action) => {
      state.value = action.payload
    },
    updateCart:(state, action) =>{
      state.value.cart.products = action.payload
    }
  }
})

export const {setUsuario, updateCart} = userSlice.actions

export const setUser = (user) => {
  return dispatch => {
    dispatch(setUsuario(user))
  }
}

export const putCart = (id, body) => {
  return async dispatch => {
    try{
      const bodyParse = {
        products: body
      }
      const cart = await cartServices.update(id, bodyParse)
      dispatch(updateCart(body))
    }catch(e){
      console.log(e)
    }
  }
}

export default userSlice.reducer