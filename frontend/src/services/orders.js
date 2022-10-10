import axios from 'axios'
import { token } from './users'

const baseUrl = '/api/orders'

const getSuccess = async () => {
  const { data } = await axios.get(`${baseUrl}/success`)
  return data
}

const getOrdersUser = async (id) => {
  const options = {
    headers: { Authorization: token }
  };
  const { data } = await axios.get(`${baseUrl}/${id}`,options)
  return data
}

const createOrder = async (body) => {
  const options = {
    headers: { Authorization: token }
  };
  const { data } = await axios.post(baseUrl,body,options)
  return data
}

const getOneOrder = async (id) => {
  const options = {
    headers: { Authorization: token }
  };
  const { data } = await axios.get(`${baseUrl}/order/${id}`,options)
  return data
}

const getAllOrders = async (offset, limit=10) => {
  const options = {
    headers: { Authorization: token }
  };
  const { data } = await axios.get(`${baseUrl}?offset=${offset}&limit=${limit}`,options)
  return data 
}

const getOrdersStats = async () => {
  const options = {
    headers: { Authorization: token }
};
  const { data } = await axios.get(`${baseUrl}/stats`,options)
  return data
}

const getBestSellers = async () => {
  const options = {
    headers: { Authorization: token }
};
const { data } = await axios.get(`${baseUrl}/success?admin=true`,options)
return data 
}

const getBestBrands = async () => {
  const options = {
    headers: { Authorization: token }
};
  const { data } = await axios.get(`${baseUrl}/bestbrand`,options)
  return data
}

export default {
  getSuccess,
  getOrdersUser,
  createOrder,
  getAllOrders,
  getOneOrder,
  getOrdersStats,
  getBestSellers,
  getBestBrands
}