import axios from 'axios'
import {token} from './users'

const baseUrl = '/api/products'

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const getOne = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`)
  return data
}

const createProduct = async (product) => {
  const options = {
    headers: { Authorization: token }
};
  const response = await axios.post(baseUrl,product,options)
  return response.data
}

const updateProduct = async (id, body) => {
  const options = {
    headers: { Authorization: token }
  };
  const { data } = await axios.put(`${baseUrl}/${id}`, body, options)
  return data
}

const deleteProduct = async (id) => {
  const options = {
    headers: { Authorization: token }
};
 await axios.delete(`${baseUrl}/${id}`,options)
}

export default {
  getAll,
  getOne,
  createProduct,
  deleteProduct,
  updateProduct
}
