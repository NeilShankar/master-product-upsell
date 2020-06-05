import axios from 'axios'

const GetProductsLive = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/getProducts`
})

export default GetProductsLive