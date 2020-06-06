import axios from 'axios'

const GetProductsLive = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/getProducts`
})

export default GetProductsLive