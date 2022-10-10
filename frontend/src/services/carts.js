import axios from 'axios'

import { token } from './users'

const baseUrl = '/api/carts'

const update = async (id, body) => {
  const options = {
    headers: { Authorization: token }
  };
   const { data } = await axios.put(`${baseUrl}/${id}`, body, options)
   return data 
}

export default {
  update
}