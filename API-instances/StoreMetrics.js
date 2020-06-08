import axios from 'axios'

const GetMetrics = axios.create({
  baseURL: `${process.env.HOST}/api/getMetrics`
})

export default GetMetrics