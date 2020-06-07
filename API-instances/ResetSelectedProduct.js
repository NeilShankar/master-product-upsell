import axios from 'axios'

const ResetProducts = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/resetProducts`
})

export default ResetProducts