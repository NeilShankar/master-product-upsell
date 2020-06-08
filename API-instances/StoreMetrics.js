import axios from 'axios'

const GetMetrics = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/getMetrics`
})

export default GetMetrics