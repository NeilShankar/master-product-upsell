import axios from 'axios'

const GetMetrics = axios.create({
  baseURL: `https://30002f58.ngrok.io/api/getMetrics`
})

export default GetMetrics