import axios from 'axios'

const GetMetrics = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/getMetrics`
})

export default GetMetrics