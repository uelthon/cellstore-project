import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import userServices from "../services/users";
import { setUser } from "../reducers/userReducer";
import { getProducts } from "../reducers/productsReducer";
import { setBest, setOrdersUser } from '../reducers/ordersReducer'

export const useStartLogin = () => {
  const dispatch = useDispatch()
  const [ startLoading, setStartLoading ] = useState(true)

  const fetchUser = async (id) => {
    try{
      const user = await userServices.getOne(id)
      dispatch(setUser(user))
      dispatch(setOrdersUser(user.id))
      setStartLoading(false)
    }catch(e){
      console.log(e)
      setStartLoading(false)
    }
  }

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('userCellStore'));
      if(data){
        userServices.setToken(data.token)
        fetchUser(data.id)
      }else{
        setStartLoading(false)
      }
  },[])

  return {
    startLoading
  }

}

export const useStartProducts = () => {
  const dispatch = useDispatch()
  const [ productsLoading, setProductsLoading ] = useState(true)

  useEffect(() => {
    dispatch(getProducts())
    dispatch(setBest())
    setProductsLoading(false)
  },[])

  return {
    productsLoading
  }
}

