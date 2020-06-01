import axios from 'axios'

const ResetProducts = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/resetProducts`
})

export default ResetProducts