import axios from 'axios'

const GetProductsLive = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/getProducts`
})

export default GetProductsLive