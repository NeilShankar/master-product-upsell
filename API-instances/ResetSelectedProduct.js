import axios from 'axios'

const ResetProducts = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/resetProducts`
})

export default ResetProducts