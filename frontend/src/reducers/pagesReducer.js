import { createSlice } from "@reduxjs/toolkit";

const initial = {
  brand: [],
  rom: 0,
  ram:0,
  display: 0,
  battery: 0,
  price: 0
}

const pageSlice = createSlice({
  name:'pages',
  initialState:{
    pagination: 0,
    filters: {...initial},
    sort:'recents'
  },
  reducers:{
    setPagination: (state, action) => {
      state.pagination = action.payload
    },
    setFilters: (state, action) =>{
      state.filters = action.payload
    },
    setFiltersReset: (state, action) => {
      state.filters = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    }
  }
})

export const { setPagination, setFilters, setFiltersReset, setSort } = pageSlice.actions

export const setOffSet = (page) => {
  return dispatch => {
    dispatch(setPagination(page))
  }
}

export const setCheck = (newFilters) => {
  return dispatch => {
    dispatch(setFilters(newFilters))
  }
}

export const setCheckReset = () => {
  return dispatch => {
    dispatch(setFiltersReset({...initial}))
  }
}

export const setsortProducts = (order) => {
  return dispatch => {
    dispatch(setSort(order))
  }
}

export default pageSlice.reducer