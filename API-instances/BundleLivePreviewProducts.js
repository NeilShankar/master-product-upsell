import axios from 'axios'

const GetProductsLive = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/getProducts`
})

export default GetProductsLive