import axios from 'axios'

const GetMetrics = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/getMetrics`
})

export default GetMetrics