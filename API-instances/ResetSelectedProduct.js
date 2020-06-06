import axios from 'axios'

const ResetProducts = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/resetProducts`
})

export default ResetProducts