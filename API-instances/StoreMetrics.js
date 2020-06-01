import axios from 'axios'

const GetMetrics = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/getMetrics`
})

export default GetMetrics