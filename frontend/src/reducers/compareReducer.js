import { createSlice } from "@reduxjs/toolkit";

const compareSlice = createSlice({
  name:'compare',
  initialState:{
    value: []
  },
  reducers: {
    set_item: (state, action) => {
      state.value = [...state.value, action.payload]
    },
    remove_item: (state, action) => {
      const newState = state.value.filter(e => e.id !== action.payload)
      state.value = newState
    }
  }
})

export const { set_item, remove_item } = compareSlice.actions

export const setItem = (item) => {
  return dispatch => {
    dispatch(set_item(item))
  }
}

export const removeItem = (id) => {
  return dispatch => {
    dispatch(remove_item(id))
  }
}

export default compareSlice.reducer