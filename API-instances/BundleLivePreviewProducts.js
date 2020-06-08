import axios from 'axios'

const GetProductsLive = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/getProducts`
})

export default GetProductsLive