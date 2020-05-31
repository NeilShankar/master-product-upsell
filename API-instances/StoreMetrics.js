import axios from 'axios'

const GetMetrics = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/getMetrics`
})

export default GetMetrics