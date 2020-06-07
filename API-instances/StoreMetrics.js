import axios from 'axios'

const GetMetrics = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/getMetrics`
})

export default GetMetrics