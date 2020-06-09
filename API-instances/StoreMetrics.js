import axios from 'axios'

const GetMetrics = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/getMetrics`
})

export default GetMetrics