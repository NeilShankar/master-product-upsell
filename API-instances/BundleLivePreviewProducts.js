import axios from 'axios'

const url = process.env.HOST + '/api/getProducts'

const GetProductsLive = axios.create({
  baseURL: url
})

export default GetProductsLive