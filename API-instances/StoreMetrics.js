import axios from 'axios'

const GetMetrics = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/getMetrics`
})

export default GetMetrics