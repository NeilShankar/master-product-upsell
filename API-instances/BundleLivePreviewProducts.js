import axios from 'axios'

const GetProductsLive = axios.create({
  baseURL: `https://30002f58.ngrok.io/api/getProducts`
})

export default GetProductsLive