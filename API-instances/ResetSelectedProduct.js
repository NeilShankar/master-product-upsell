import axios from 'axios'

const ResetProducts = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/resetProducts`
})

export default ResetProducts