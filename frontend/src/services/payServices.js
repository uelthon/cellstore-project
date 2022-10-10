import axios from 'axios'

const baseUrl = '/api/payments'

const payOut = async (amount) => {
    const { data } = await axios.post(baseUrl, amount)
    return data
}

export default {
  payOut
}