import axios from 'axios'

const ResetProducts = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/resetProducts`
})

export default ResetProducts