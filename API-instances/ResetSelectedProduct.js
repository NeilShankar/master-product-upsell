import axios from 'axios'

const ResetProducts = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/resetProducts`
})

export default ResetProducts