import { createSlice } from "@reduxjs/toolkit";
import orderServices from "../services/orders";

const orderSlice = createSlice({
  name:'orders',
  initialState:{
    userOrders: [],
    bestSellers: []
  },
  reducers: {
    setBestSellers: (state, action) => {
      state.bestSellers = action.payload
    },
    setUserOrders:(state, action) =>{
      state.userOrders = action.payload
    },
    setOrderNew: (state, action) => {
      state.userOrders = [...state.userOrders, action.payload]
    }, 
    resetOrders: (state, action) => {
      state.userOrders = []
    }
  }
})

export const {setBestSellers, setUserOrders, resetOrders, setOrderNew} = orderSlice.actions

export const setBest = () => {
  return async dispatch =>{
    const data = await orderServices.getSuccess()
    dispatch(setBestSellers(data))
  }
}

export const setOrdersUser = (id) => {
  return async dispatch =>  {
    const data = await orderServices.getOrdersUser(id)
    dispatch(setUserOrders(data))
  }
}

export const setNewOrder = (order) => {
  return dispatch => {
    dispatch(setOrderNew(order))
  }
}

export const ordersReset = () => {
  return dispatch => {
    dispatch(resetOrders())
  }
}

export default orderSlice.reducer