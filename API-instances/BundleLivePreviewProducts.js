import axios from 'axios'

const GetProductsLive = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/getProducts`
})

export default GetProductsLive