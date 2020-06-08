import axios from 'axios'

const ResetProducts = axios.create({
  baseURL: `${process.env.HOST}/api/resetProducts`
})

export default ResetProducts