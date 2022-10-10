import { createSlice } from "@reduxjs/toolkit";

const notiSlice = createSlice({
  name:'notification',
  initialState:{
    value:null
  },
  reducers:{
    setNotification: (state, action) => {
      state.value = action.payload
    }
  }
})

export const {setNotification} = notiSlice.actions

let timer = null

export const setNoti = (noti) => {
  return dispatch => {
      if(timer){
        clearTimeout(timer)
      }
      dispatch(setNotification(noti))
      timer = setTimeout(() => {
        dispatch(setNotification(null))
      },5000)
  }
}

export default notiSlice.reducer