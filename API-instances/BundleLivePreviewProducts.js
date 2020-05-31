import axios from 'axios'

const GetProductsLive = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/getProducts`
})

export default GetProductsLive