import axios from 'axios'

export let token = null;
const baseUrl = '/api/users';

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
    }

const getAll = async (offset=0, limit=5) =>  {
  const options = {
    headers: { Authorization: token }
};
  const { data } = await axios.get(`${baseUrl}?offset=${offset}&limit=${limit}`,options)
  return data
}

const getOne = async (id) => {
  const options = {
    headers: { Authorization: token }
};
  const { data } = await axios.get(`${baseUrl}/${id}`,options)
  return data
}

const createUser = async (body) => {
  const { data } = await axios.post(baseUrl,body)
  return data
}

const disableUser = async (id) => {
  const options = {
    headers: { Authorization: token }
};
  const { data } = await axios.put(`${baseUrl}/${id}/status`,{},options)
  return data
}

const adminUser = async (id) => {
  const options = {
    headers: { Authorization: token }
  };
  const { data } = await axios.put(`${baseUrl}/${id}/admin`,{},options)
  return data
}

const getUsersStats = async () => {
  const options = {
    headers: { Authorization: token }
};
  const { data } = await axios.get(`${baseUrl}/stats`,options)
  return data
}

export default {
  getAll,
  getOne,
  createUser,
  disableUser,
  setToken,
  token,
  adminUser,
  getUsersStats
}


